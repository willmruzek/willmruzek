import yaml from 'js-yaml';

import rawYaml from '../../content/resume.yaml?raw';
import { ResumeSchema } from '../../schemas/resume.ts';
import { compose } from '../utils/compose.ts';

const parseResume = compose(ResumeSchema.parse, yaml.load);

export const resume = parseResume(rawYaml);

export type {
  ResumeClient,
  Resume,
  ResumeEducation,
  ResumeEngagement,
  ResumeExperience,
} from '../../schemas/resume.ts';
