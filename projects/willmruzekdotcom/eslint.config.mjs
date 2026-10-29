import path from "node:path";
import url from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// Resolve base directory for FlatCompat
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Bridge legacy extends to flat config
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js recommended + TypeScript rules
  ...nextVitals,
  ...nextTypescript,

  // MDX support and remark processor
  ...compat.extends("plugin:mdx/recommended"),

  // Workspace ignores
  {
    ignores: ["**/.*", ".next/*", "next-env.d.ts", "AGENTS.md"],
  },

  // Global settings
  {
    settings: {
      // Resolve TS path aliases and standard Node resolution
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
  },

  {
    files: ["**/*.{js,jsx,ts,tsx,mdx}"],
    rules: {
      // Flag unused exports and missing exports
      // "import/no-unused-modules": [
      //   "error",
      //   {
      //     unusedExports: true,
      //     missingExports: true,
      //     ignoreExports: [
      //       // Ignore Next.js App Router special files
      //       "**/src/app/**/page.{ts,tsx}",
      //       "**/src/app/**/layout.{ts,tsx}",
      //       "**/src/app/**/route.{ts,tsx}",
      //       "**/src/app/**/_meta.js",
      //       "./next.config.ts",
      //       "./src/proxy.ts",
      //       "**/*.mdx",
      //       "**/_meta.js",
      //     ],
      //   },
      // ],
    },
  },

  // MDX-only overrides (processor comes from plugin:mdx/recommended)
  {
    files: ["content/**/*.mdx"],
    rules: {},
  },
];

export default eslintConfig;
