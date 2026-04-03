/**
 * Validates resume.yaml against the Zod schema.
 *
 * Usage:
 *   pnpm validate
 */

import fs from "node:fs";
import path from "node:path";
import url from "node:url";

import yaml from "js-yaml";

import { ResumeSchema } from "../src/lib/resume-schema.ts";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

async function main() {
  const yamlPath = path.resolve(__dirname, "../data/resume.yaml");

  const result = ResumeSchema.safeParse(
    yaml.load(fs.readFileSync(yamlPath, "utf-8")),
  );

  if (!result.success) {
    const messages = result.error.issues
      .map((issue) => `  [${issue.path.join(".")}] ${issue.message}`)
      .join("\n");
    throw new Error(
      `Found ${result.error.issues.length} issue(s) in resume.yaml:\n${messages}`,
    );
  }
}

main()
  .then(() => console.log("resume.yaml is valid."))
  .catch((err: unknown) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  });
