---
layout: post
title: Multiples Postgres databases in one service with Docker Compose
published: True
---

![](/images/posts/docker-compose-whale.png)

Sometimes, we need to have multiple database instances to test our projects. Until now, Docker and Docker Compose don't have an easy alternative to resolve this. 

Some people (and I) have gotten around this by creating services for each database they need:

```yml
### docker-compose.yaml
services:
  postgres_1:
    image: postgres:latest
  postgres_2:
    image: postgres:latest
```


I resolved this by adding a new entrypoint and setting a environment var in the Docker Compose Service for Postgres:

The container entrypoint:
```bash
### entrypoint.sh
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
And the docker-compose service:
```yml
### docker-compose.yaml

  postgres:
    image: postgres:alpine
    container_name: postgres
    restart: unless-stopped
    ports:
      - 5432:5432
    environment:
        POSTGRES_PASSWORD: "postgres"
        POSTGRES_MULTIPLE_DATABASES: users, products, orders
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
   volumes:
     - ./<path-of-the-entrypoint>/multiple-databases.sh:/docker-entrypoint-initdb.d/multiple-databases.sh

```