import { z } from "zod";

export const ExperienceTypeSchema = z.enum([
  "Full-time",
  "Consulting",
  "Consulting & Full-time",
]);

export const ExperienceSchema = z
  .object({
    title: z.string().min(1).optional(),
    company: z.string().min(1),
    company_size: z.string().min(1).optional(),
    employment_type: ExperienceTypeSchema.optional(),
    start_date: z.string().min(1).optional(),
    end_date: z.string().min(1).optional(),
    duration: z.string().min(1).optional(),
    location: z.string().min(1).optional(),
    tech: z.array(z.string().min(1)).optional(),
    bullets: z.array(z.string().min(1)).optional(),
    page_break: z.boolean().optional(),
  })
  .transform(
    ({
      start_date,
      end_date,
      page_break,
      employment_type,
      company_size,
      ...rest
    }) => ({
      ...rest,
      companySize: company_size,
      employmentType: employment_type,
      startDate: start_date,
      endDate: end_date,
      pageBreak: page_break ?? false,
    }),
  );

export const EducationSchema = z.object({
  school: z.string().min(1),
  degree: z.string().min(1),
  distinction: z.string().min(1).optional(),
});

export const ResumeSchema = z
  .object({
    name: z.string().min(1),
    headline: z.string().min(1),
    email: z.string().min(1),
    location: z.string().min(1),
    summary: z.string().min(1),
    top_skills: z.array(z.string().min(1)),
    experience: z.array(ExperienceSchema),
    education: EducationSchema,
  })
  .transform(({ top_skills, ...rest }) => ({
    ...rest,
    topSkills: top_skills,
  }));

export type Resume = z.infer<typeof ResumeSchema>;
export type ResumeExperience = z.infer<typeof ExperienceSchema>;
export type ResumeEducation = z.infer<typeof EducationSchema>;
