import type { Resume } from "@/lib/resume-schema";

import { ExperienceEntry } from "./ExperienceEntry";
import { resumeMetaLineClassName } from "./resumeMetaLine";

function earlierExperienceCompanyLabel(company: string): string {
  return company === "Self Employed" ? "Independent Consultant" : company;
}

function getShortResume(resume: Resume): Resume {
  return {
    ...resume,
    summary: resume.summary.split("\n\n").slice(0, 2).join("\n\n"),
    experience: resume.experience.slice(0, 2).map((exp) => ({
      ...exp,
      tech: exp.tech?.slice(0, 8),
      clients: exp.clients?.slice(0, 1).map((client) => ({
        ...client,
        tech: client.tech?.slice(0, 8),
      })),
      otherEngagements: undefined,
      pageBreak: false,
    })),
  };
}

export function ShortResumeContent({ resume }: { resume: Resume }) {
  const shortResume = getShortResume(resume);
  const {
    name,
    headline,
    email,
    location,
    topSkills,
    aiTools,
    experience,
    education,
  } = shortResume;

  const earlierCompanyNames = resume.experience
    .slice(experience.length)
    .map((exp) => earlierExperienceCompanyLabel(exp.company));

  return (
    <div className="resume-short-print resume-rhythm-root x:mt-[calc(var(--resume-baseline-step)*3)] x:print:mt-0 x:print:text-sm">
      <header className="x:mb-(--resume-baseline-step) x:border-b x:border-gray-300 x:pb-(--resume-baseline-step) x:dark:border-gray-600 x:print:border-b-0 x:print:shadow-[0_1px_0_#d1d5db]">
        <div className="x:flex x:items-start x:justify-between x:gap-4">
          <div className="x:min-w-0 x:flex-1">
            <h1 className="x:text-4xl x:leading-[calc(var(--resume-baseline-step)*2)] x:font-bold x:tracking-tight x:text-gray-900 x:dark:text-gray-100 x:print:text-3xl">
              {name}
            </h1>
            <div className="x:mt-(--resume-baseline-step) x:space-y-0 x:print:mt-(--resume-baseline-step)">
              <p className={resumeMetaLineClassName}>{headline}</p>
              <p className={resumeMetaLineClassName}>{topSkills.join(", ")}</p>
              <p className={resumeMetaLineClassName}>{aiTools.join(", ")}</p>
            </div>
          </div>
          <div className="x:shrink-0 x:text-right x:text-sm x:leading-(--resume-baseline-step) x:text-gray-500 x:dark:text-gray-400 x:print:text-xs">
            <div>{email}</div>
            <div>{location}</div>
            <div className="x:mt-(--resume-baseline-step) x:space-y-0">
              <p className={resumeMetaLineClassName}>
                Full resume at{" "}
                <a
                  href="https://willmruzek.com/resume"
                  className="x:text-gray-600 x:underline x:underline-offset-2 x:dark:text-gray-300"
                >
                  willmruzek.com/resume
                </a>
              </p>
              <p className={resumeMetaLineClassName}>
                Side-project details at{" "}
                <a
                  href="https://willmruzek.com/projects"
                  className="x:text-gray-600 x:underline x:underline-offset-2 x:dark:text-gray-300"
                >
                  willmruzek.com/projects
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="x:mb-(--resume-baseline-step)">
        <h2 className="x:mb-(--resume-baseline-step) x:text-xs x:leading-(--resume-baseline-step) x:font-semibold x:tracking-widest x:text-gray-500 x:uppercase x:dark:text-gray-400">
          Experience
        </h2>
        <div className="x:space-y-(--resume-baseline-step)">
          {experience.map((exp, i) => (
            <ExperienceEntry key={i} exp={exp} />
          ))}
        </div>
      </section>

      {earlierCompanyNames.length > 0 && (
        <section className="x:mb-(--resume-baseline-step)">
          <h2 className="x:mb-(--resume-baseline-step) x:text-xs x:leading-(--resume-baseline-step) x:font-semibold x:tracking-widest x:text-gray-500 x:uppercase x:dark:text-gray-400">
            Earlier Experience
          </h2>
          <p className="x:text-sm x:leading-(--resume-baseline-step) x:text-gray-700 x:dark:text-gray-300">
            {earlierCompanyNames.join(", ")}
          </p>
        </section>
      )}

      <section>
        <h2 className="x:mb-(--resume-baseline-step) x:text-xs x:leading-(--resume-baseline-step) x:font-semibold x:tracking-widest x:text-gray-500 x:uppercase x:dark:text-gray-400">
          Education
        </h2>
        <div>
          <div className="x:leading-(--resume-baseline-step) x:font-semibold x:text-gray-900 x:dark:text-gray-100">
            {education.school}
          </div>
          <div className="x:text-sm x:leading-(--resume-baseline-step) x:text-gray-900 x:dark:text-gray-100">
            {education.degree}
          </div>
        </div>
      </section>
    </div>
  );
}
