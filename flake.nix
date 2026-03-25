{
  description = "Jekyll blog development shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            ruby
            bundler
            git
            pkg-config
            libyaml
          ];

          buildInputs = with pkgs; [
            openssl
          ];

          shellHook = ''
            export GEM_HOME="$PWD/.gems"
            export PATH="$GEM_HOME/bin:$PATH"
            echo "Jekyll dev shell ready — run 'bundle install' then 'bundle exec jekyll serve --livereload'"
          '';
        };
      });
}
