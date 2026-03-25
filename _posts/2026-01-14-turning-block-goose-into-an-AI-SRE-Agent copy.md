---
layout: post
title: Turning block/goose into an AI SRE Agent
description: Modern SRE work is no longer about just reacting to alerts. It is about speed of investigation, context, and automation of toil.
image: /images/posts/ai-sre-agent.jpeg
published: True
---

![](/images/posts/ai-sre-agent.jpeg)

"It works on my machine" is a phrase that has haunted software development for decades. Whether it's a teammate having a different version of Python, a CI server missing a specific C library, or your global Node.js version conflicting with a legacy project, environment drift is a silent productivity killer.

I resolved this by moving my entire development workflow to **Nix Flakes**. 

Nix guarantees that if a project works today, it will work exactly the same way six months from now, or on a completely different machine, without manual installation steps.

---

### Why Nix?

In modern software development, we don't just write code; we manage a fleet of tools. Nix provides a declarative way to handle:

* **Isolation:** No more polluting your global `/usr/local/bin`. Every tool stays within the project.
* **Reproducibility:** Every dependency is pinned. If I use Python 3.12.1, everyone on the team uses 3.12.1.
* **Automation:** Using the `shellHook`, we can automate the startup of services, credential helpers, and environment variables.

### The Project Orchestrator: `flake.nix`

I use a `flake.nix` in every repository. This specific configuration handles a complex stack: Python (managed by **uv**), AWS (with ECR automation), Docker, and various security tools.



### flake.nix
```nix
{
  description = "DevShell con Terraform, Docker, Python y ECR login";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };

        pythonEnv = pkgs.python312.withPackages (ps: with ps; [
          pip
        ]);

        commonDeps = with pkgs; [
          pythonEnv
          uv
          git
          terraform
          python312
          awscli
          gcc
          stdenv.cc.cc.lib
          httpie
          go
          go-task
          docker
          amazon-ecr-credential-helper
          jq
          nodejs_20
          nodePackages.lerna
          google-chrome
          subfinder
          amass
          imagemagick
          yarn
        ];
      in {
        devShells.default = pkgs.mkShell {
          packages = commonDeps;

          shellHook = ''
            # 1. Python & uv Setup
            pyenv global system
            export pythonEnv=${pythonEnv}
            export PATH=$PATH:${pythonEnv}/bin
            
            # Ensure uv uses the Nix-provided Python interpreter
            export UV_PYTHON=${pythonEnv}/bin/python

            # 2. Service Orchestration
            docker compose up --build -d
            docker compose ps -a
            task dependencies

            # 3. AWS & Docker Credential Automation
            mkdir -p ~/.docker
            echo '{
              "credsStore": "ecr-login"
            }' > ~/.docker/config.json
            echo "Docker config set to use docker-credential-ecr-login"
          '';

          LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
            pkgs.stdenv.cc.cc.lib
          ];
        };
      });
}
```

### How it works: A Deep Dive
1. The Declarative Environment
Inside commonDeps, I list everything from compilers (gcc) to specialized tools like amazon-ecr-credential-helper. When someone joins the project, they don't need to "install" these manually. Nix handles the fetching and linking into an isolated environment, ensuring that your system remains clean and the project remains portable.

### 2. The uv Advantage
I use uv because of its incredible speed and its seamless integration with existing Python environments. By setting export UV_PYTHON=${pythonEnv}/bin/python in the shellHook, I tell uv to use the exact Python binary managed by Nix. This ensures total consistency between the package manager and OS-level dependencies.

### 3. The shellHook Magic
This is where Nix transcends being a simple package manager and becomes a project manager:

Automatic Infrastructure: As soon as I enter the shell, docker compose up runs. My databases and local services are ready before I even type my first line of code.

Automated Config: It writes the ~/.docker/config.json automatically. This allows me to push/pull from AWS ECR without ever having to run manual aws ecr get-login-password steps.

Task Execution: Running task dependencies ensures that any sub-requirements (like npm install or go mod download) are checked and verified as soon as the shell opens.

### Entering the Environment
To activate this entire setup, I use the following command:

```Bash

nix --extra-experimental-features 'nix-command flakes' develop --impure --command zsh
```
--extra-experimental-features 'nix-command flakes': Enables the modern Nix Flake commands required for this setup.

--impure: This is essential because the shellHook needs to interact with the outside world (your home directory for ~/.docker and the system Docker socket).

--command zsh: Drops me directly into my preferred shell with the entire environment already loaded and ready to go.

### Conclusion
Nix has fundamentally transformed how I approach project setups. Instead of a long README.md containing 20 manual installation steps that are prone to failure, I provide a single flake.nix that defines the entire universe for the project.

It is faster, safer, and 100% reproducible. If it works for me, it will work for you.