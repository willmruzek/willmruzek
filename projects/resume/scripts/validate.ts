import fs from 'node:fs';
import path from 'node:path';

import yaml from 'js-yaml';

import { ResumeSchema } from '../schemas/resume.ts';

async function main() {
  const yamlPath = path.resolve(import.meta.dirname, '../content/resume.yaml');

  const parse = (filePath: string) =>
    ResumeSchema.safeParse(yaml.load(fs.readFileSync(filePath, 'utf-8')));

  const result = parse(yamlPath);

  if (!result.success) {
    const messages = result.error.issues
      .map((issue) => `  [${issue.path.join('.')}] ${issue.message}`)
      .join('\n');
    throw new Error(
      `Found ${result.error.issues.length} issue(s) in resume.yaml:\n${messages}`,
    );
  }
}

main()
  .then(() => console.log('resume.yaml is valid.'))
  .catch((err: unknown) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  });
