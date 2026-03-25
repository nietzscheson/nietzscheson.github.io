---
layout: post
title: Microservices Federation (GraphQL, Python and Apollo)
description: Modern SRE work is no longer about just reacting to alerts. It is about speed of investigation, context, and automation of toil.
image: /images/posts/microservices-federation.png
published: True
---

![](/images/posts/microservices-federation.png)

When building microservices, one of the hardest challenges is exposing a single, unified API to the client without coupling your services together.

[Apollo Federation 2](https://www.apollographql.com/docs/federation) solves this: each service owns its slice of the graph, and a **Gateway** composes them into one supergraph — transparently.

This is the architecture we'll be building:

```plaintext
Client
  └─► Gateway :4000
         ├─► User Service    :5001  /graphql
         ├─► Product Service :5002  /graphql
         └─► Order Service   :5003  /graphql
                                        └─► Postgres :5432
                                             ├── users DB
                                             ├── products DB
                                             └── orders DB
```

The full source code is here: [https://github.com/nietzscheson/microservices-federation](https://github.com/nietzscheson/microservices-federation)

---

## Stack

- **Gateway**: Node.js + `@apollo/gateway` / Apollo Router (Rust)
- **Services**: Python 3.13 + FastAPI + Strawberry GraphQL
- **ORM**: SQLAlchemy 2 + Alembic
- **DB**: PostgreSQL 17
- **Packages**: `uv`
- **DI**: `dependency-injector`
- **Infra**: Docker Compose

---

## Database: one Postgres, three databases

We use the same trick from my [previous article](https://dev.to/nietzscheson/multiples-postgres-databases-in-one-service-with-docker-compose-4fdf): a single Postgres container that initializes multiple databases via an entrypoint script.

```bash
### docker/postgres/multiple-databases.sh

#!/bin/bash

set -e
set -u

function create_user_and_database() {
    local database=$1
    echo "  Creating user and database '$database'"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
        CREATE USER $database;
        CREATE DATABASE $database;
        GRANT ALL PRIVILEGES ON DATABASE $database TO $database;
EOSQL
}

if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
    echo "Multiple database creation requested: $POSTGRES_MULTIPLE_DATABASES"
    for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
        create_user_and_database $db
    done
    echo "Multiple databases created"
fi
```

---

## Docker Compose

Each service gets its own `DATABASE_URL` pointing to its isolated database inside the same Postgres instance. The services share a single multi-stage `Dockerfile`.

```yaml
### docker-compose.yaml

services:
  postgres:
    image: postgres:17.4
    container_name: postgres
    ports:
      - "6543:5432"
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_MULTIPLE_DATABASES: users,products,orders
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
    volumes:
      - ./docker/postgres/multiple-databases.sh:/docker-entrypoint-initdb.d/multiple-databases.sh

  user:
    build:
      context: ./services
      dockerfile: ./Dockerfile
      target: user
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/users
    ports:
      - 5001:5000
    depends_on:
      postgres:
        condition: service_healthy

  product:
    build:
      context: ./services
      dockerfile: ./Dockerfile
      target: product
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/products
    ports:
      - 5002:5000
    depends_on:
      postgres:
        condition: service_healthy

  order:
    build:
      context: ./services
      dockerfile: ./Dockerfile
      target: order
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/orders
    ports:
      - 5003:5000
    depends_on:
      postgres:
        condition: service_healthy

  gateway:
    build:
      context: ./gateway
    ports:
      - "4000:4000"
    depends_on:
      user:
        condition: service_healthy
      product:
        condition: service_healthy
      order:
        condition: service_healthy
```

---

## Multi-stage Dockerfile

All three services share a single `Dockerfile` using multi-stage builds and `uv` for fast dependency installation.

```dockerfile
### services/Dockerfile

FROM python:3.13 AS base

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /usr/local/bin/

ENV UV_PROJECT_ENVIRONMENT=/opt/venv
ENV PATH="/opt/venv/bin:$PATH"
ENV PYTHONPATH=.

FROM base AS user
WORKDIR /services/user
COPY user/pyproject.toml ./
RUN uv sync --no-install-project
CMD ["uv", "run", "uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "5000"]

FROM base AS product
WORKDIR /services/product
COPY product/pyproject.toml ./
RUN uv sync --no-install-project
CMD ["uv", "run", "uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "5000"]

FROM base AS order
WORKDIR /services/order
COPY order/pyproject.toml ./
RUN uv sync --no-install-project
CMD ["uv", "run", "uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "5000"]
```

---

## Dependency Injection

Each service uses the same DI pattern: `pydantic-settings` reads `DATABASE_URL` from the environment, and `dependency-injector` wires the SQLAlchemy engine and session as singletons.

```python
### services/order/src/containers.py

from dependency_injector import containers, providers
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.settings import Settings


class MainContainer(containers.DeclarativeContainer):

    settings = providers.Configuration(pydantic_settings=[Settings()])

    engine = providers.Singleton(
        create_engine,
        settings.database_url,
    )

    session = providers.Singleton(
        sessionmaker,
        bind=engine,
        expire_on_commit=False,
    )
```

---

## The Federation Pattern

This is the core of the project. Here's how the three services relate to each other without a single Python import between them.

### User Service — owns the entity

The User service defines the full `UserType` with `keys=["id"]` and implements `resolve_reference`. The Gateway calls this whenever another service references a `UserType` by its ID.

```python
### services/user/src/app.py

@strawberry.federation.type(keys=["id"])
class UserType:
    id: strawberry.ID
    name: str

    @classmethod
    def resolve_reference(cls, **representation) -> "UserType":
        with Session() as session:
            user = session.get(User, representation["id"])
            return cls(id=user.id, name=user.name)
```

### Product Service — stubs UserType

The Product service doesn't import anything from the User service. It declares a **stub** `UserType` with only `id`. The Gateway knows it needs to resolve the rest from the User service.

`strawberry.Private` is the key pattern here: it stores the raw foreign key integer inside the Python object without exposing it to the GraphQL schema.

```python
### services/product/src/app.py

@strawberry.federation.type(keys=["id"])
class UserType:
    id: strawberry.ID = strawberry.federation.field  # stub

    @classmethod
    def resolve_reference(cls, id: strawberry.ID):
        return UserType(id)


@strawberry.federation.type(keys=["id"])
class ProductType:
    id: strawberry.ID
    name: str
    _created_by: strawberry.Private[typing.Optional[int]] = None

    @strawberry.field
    def created_by(self) -> typing.Optional[UserType]:
        if self._created_by is not None:
            return UserType(id=self._created_by)
        return None
```

### Order Service — stubs both

The Order service stubs both `UserType` and `ProductType`. An `OrderType` holds both foreign keys privately and exposes them as federated references.

```python
### services/order/src/app.py

@strawberry.federation.type(keys=["id"])
class UserType:
    id: strawberry.ID = strawberry.federation.field

    @classmethod
    def resolve_reference(cls, id: strawberry.ID):
        return UserType(id)


@strawberry.federation.type(keys=["id"])
class ProductType:
    id: strawberry.ID = strawberry.federation.field

    @classmethod
    def resolve_reference(cls, id: strawberry.ID):
        return ProductType(id)


@strawberry.federation.type(keys=["id"])
class OrderType:
    id: strawberry.ID
    name: str
    _created_by: strawberry.Private[typing.Optional[int]] = None
    _product: strawberry.Private[typing.Optional[int]] = None

    @strawberry.field
    def created_by(self) -> typing.Optional[UserType]:
        if self._created_by is not None:
            return UserType(id=self._created_by)
        return None

    @strawberry.field
    def product(self) -> typing.Optional[ProductType]:
        if self._product is not None:
            return ProductType(id=self._product)
        return None
```

So a query like this, sent to the Gateway on port 4000:

```graphql
query {
  orders {
    id
    name
    createdBy {
      name
    }
    product {
      name
    }
  }
}
```

Is resolved by the Gateway in three steps:
1. Fetch orders from the Order service → gets `createdBy: {id}` and `product: {id}`
2. Send an `_entities` lookup to the User service to hydrate the user
3. Send an `_entities` lookup to the Product service to hydrate the product

The services are completely decoupled at the code level. The contract is purely a runtime GraphQL protocol.

---

## The Gateway

We ship two gateway implementations.

### Apollo Gateway (Node.js)

Simple, no compile step. Introspects each subgraph at startup.

```js
### gateway/server.js

const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const { ApolloServer } = require("@apollo/server");

const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
            { name: "users", url: "http://user:5000/graphql" },
            { name: "products", url: "http://product:5000/graphql" },
            { name: "orders", url: "http://order:5000/graphql" },
        ],
    }),
});

const server = new ApolloServer({ gateway });
```

### Apollo Router (Rust)

The `Dockerfile` for the gateway uses this approach. It composes a static SDL file using the `rover` CLI (retrying for 30s while services come up), then starts the high-performance Apollo Router binary.

```bash
### gateway/entrypoint.sh

for i in $(seq 1 30); do
    if rover supergraph compose --config /app/supergraph.yaml 2>/dev/null > /tmp/supergraph.graphql \
        && [ -s /tmp/supergraph.graphql ]; then
        cp /tmp/supergraph.graphql /app/supergraph.graphql
        echo "Supergraph composed successfully"
        break
    fi
    echo "Waiting for subgraphs... (attempt $i/30)"
    sleep 3
done

exec router --dev --config /app/router.yaml --supergraph /app/supergraph.graphql --log info
```

The `supergraph.yaml` tells `rover` where to find each subgraph:

```yaml
### gateway/supergraph.yaml

federation_version: =2.9.0
subgraphs:
  users:
    routing_url: http://user:5000/graphql
    schema:
      subgraph_url: http://user:5000/graphql
  products:
    routing_url: http://product:5000/graphql
    schema:
      subgraph_url: http://product:5000/graphql
  orders:
    routing_url: http://order:5000/graphql
    schema:
      subgraph_url: http://order:5000/graphql
```

---

## Running it

```bash
docker compose up --build
```

Open the Apollo Router sandbox at [http://localhost:4000](http://localhost:4000) and run:

```graphql
mutation {
  userCreate(name: "Alice") { id name }
}

mutation {
  productCreate(name: "Widget", createdBy: 1) { id name }
}

mutation {
  orderCreate(name: "Order #1", createdBy: 1, product: 1) { id name }
}

query {
  orders {
    id
    name
    createdBy { name }
    product { name }
  }
}
```

---

## Key Takeaways

- **`resolve_reference`** is the federation contract — any federated entity must implement it so the Gateway can hydrate it from just an `id`.
- **`strawberry.Private`** lets you store raw foreign keys in your Python object without leaking them into the GraphQL schema.
- **Services are truly decoupled** — zero Python imports across service boundaries. The only contract is the GraphQL protocol at runtime.
- **One Dockerfile, three services** — multi-stage builds keep your infra DRY.
- **`uv` over pip/poetry** — significantly faster installs, especially in Docker layer caching.