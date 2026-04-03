# Agent rules

## Project Workflow guidelines

- Use `pnpm` instead of `npm`
- Use `pnpx` instead of `npx`
- Use `pnpm --filter <project> run <script>` instead of `cd <project> && pnpm run <script>`

## Project Coding guidelines

- Use Tailwind v4 for styles as much as possible over CSS modules (including TW's @apply)
  - **Intent**: Adhere to the Tailwind v4 way of doing things.
- Use `node:*` prefixed package names when importing Node dependencies, ex:
  - **Intent**: Be clear that this is a platform dependency.
  - Examples
    - `import fs from "node:fs";`
  - Use default or namespace import for `node:*` packages to help clarify the origin and intent of the function used. Example: . Just `join` would be too vague without searching for more context (which we don't want to do)
    - **Intent**: Make it immediately clear this function is related to a class of functions.
    - Examples
      - Including `path.*` clarifies immediately we're talking about joining path segments. `import path from "node:path"; path.join(...)`
