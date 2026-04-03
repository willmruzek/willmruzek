import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Resolve base directory for FlatCompat
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Bridge legacy extends to flat config
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js recommended + TypeScript rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // MDX support and remark processor
  ...compat.extends("plugin:mdx/recommended"),

  // Workspace ignores
  {
    ignores: ["**/.*", ".next/*", "next-env.d.ts"],
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
      //       "./src/middleware.ts",
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
