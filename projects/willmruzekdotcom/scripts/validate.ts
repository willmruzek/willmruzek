/**
 * Validates data files against their Zod schemas.
 *
 * Usage:
 *   pnpm validate
 */

import fs from "node:fs";
import path from "node:path";
import url from "node:url";

import yaml from "js-yaml";
import { z } from "zod";

import { ResumeSchema } from "../src/lib/resume-schema.ts";
import { ProjectsSchema } from "../src/lib/projects-schema.ts";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

type ValidateFileOptions<TSchema extends z.ZodType> = {
  filePath: string;
  schema: TSchema;
  fileName: string;
};

function validateFile<TSchema extends z.ZodType>({
  filePath,
  schema,
  fileName,
}: ValidateFileOptions<TSchema>): void {
  const absolutePath = path.resolve(__dirname, filePath);
  const result = schema.safeParse(
    yaml.load(fs.readFileSync(absolutePath, "utf-8")),
  );

  if (!result.success) {
    const messages = result.error.issues
      .map((issue) => `  [${issue.path.join(".")}] ${issue.message}`)
      .join("\n");
    throw new Error(
      `Found ${result.error.issues.length} issue(s) in ${fileName}:\n${messages}`,
    );
  }
}

async function main() {
  validateFile({
    filePath: "../data/resume.yaml",
    schema: ResumeSchema,
    fileName: "resume.yaml",
  });
  validateFile({
    filePath: "../data/projects.yaml",
    schema: ProjectsSchema,
    fileName: "projects.yaml",
  });
}

main()
  .then(() => {
    console.log("resume.yaml is valid.");
    console.log("projects.yaml is valid.");
  })
  .catch((err: unknown) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  });
