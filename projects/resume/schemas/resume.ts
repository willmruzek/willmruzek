import { z } from 'zod';

export const ProjectSchema = z.object({
  company: z.string().min(1),
  via: z.string().min(1).optional(),
  duration: z.string().min(1).optional(),
  tech: z.array(z.string().min(1)).optional(),
  bullets: z.array(z.string().min(1)),
});

export const ExperienceSchema = z
  .object({
    title: z.string().min(1),
    company: z.string().min(1),
    employment_type: z.string().min(1).optional(),
    start_date: z.string().min(1),
    end_date: z.string().min(1).optional(),
    location: z.string().min(1).optional(),
    tech: z.array(z.string().min(1)).optional(),
    bullets: z.array(z.string().min(1)).optional(),
    projects: z.array(ProjectSchema).optional(),
    page_break: z.boolean().optional(),
  })
  .transform(({ employment_type, start_date, end_date, page_break, ...rest }) => ({
    ...rest,
    employmentType: employment_type,
    startDate: start_date,
    endDate: end_date,
    pageBreak: page_break ?? false,
  }));

export const EducationSchema = z.object({
  school: z.string().min(1),
  degree: z.string().min(1),
  year: z.string().min(1),
  grade: z.string().min(1).optional(),
});

export const ResumeSchema = z
  .object({
    name: z.string().min(1),
    headline: z.string().min(1),
    email: z.string().min(1),
    location: z.string().min(1),
    summary: z.string().min(1),
    top_skills: z.array(z.string().min(1)),
    ai_tools: z.array(z.string().min(1)),
    experience: z.array(ExperienceSchema),
    education: EducationSchema,
  })
  .transform(({ top_skills, ai_tools, ...rest }) => ({
    ...rest,
    topSkills: top_skills,
    aiTools: ai_tools,
  }));

export type Resume = z.infer<typeof ResumeSchema>;
export type ResumeExperience = z.infer<typeof ExperienceSchema>;
export type ResumeProject = z.infer<typeof ProjectSchema>;
export type ResumeEducation = z.infer<typeof EducationSchema>;
