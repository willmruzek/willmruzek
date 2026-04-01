{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{
  packages = [ pkgs.git ];

  languages.javascript.enable = true;
  languages.javascript.corepack.enable = true;
  languages.javascript.package = pkgs.nodejs-slim_24;
  languages.typescript.enable = true;

  scripts.npm.exec = ''
    echo "This project uses pnpm. Use pnpm instead." >&2
  '';

  scripts.npx.exec = ''
    echo "This project uses pnpm. Use pnpx instead." >&2
  '';

  enterShell = ''
    # Run scripts directly
  '';

  # https://devenv.sh/tasks/
  # tasks = {
  #   "myproj:setup".exec = "mytool build";
  #   "devenv:enterShell".after = [ "myproj:setup" ];
  # };

  # https://devenv.sh/tests/
  enterTest = ''
    echo "Running tests"
    git --version | grep --color=auto "${pkgs.git.version}"
  '';

  # https://devenv.sh/git-hooks/
  # git-hooks.hooks.shellcheck.enable = true;

  dotenv.disableHint = true;

  # See full reference at https://devenv.sh/reference/options/
}
