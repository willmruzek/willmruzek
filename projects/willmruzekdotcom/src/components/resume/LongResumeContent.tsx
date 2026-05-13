import type { Resume } from "@/lib/resume-schema";

import { ExperienceEntry } from "./ExperienceEntry";
import { resumeMetaLineClassName } from "./resumeMetaLine";

export function LongResumeContent({ resume }: { resume: Resume }) {
  const {
    name,
    headline,
    email,
    location,
    summary,
    topSkills,
    aiTools,
    experience,
    education,
  } = resume;

  return (
    <div className="resume-rhythm-root x:mt-[calc(var(--resume-baseline-step)*3)] x:print:mt-0">
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
            <div className="x:mt-(--resume-baseline-step) x:hidden x:space-y-0 x:print:block">
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
        <div className="x:mt-(--resume-baseline-step) x:flex x:justify-end x:gap-2 x:print:hidden">
          <a
            href="/static/WillMruzekResume.pdf"
            className="x:rounded x:bg-gray-800 x:px-3 x:py-1 x:text-xs x:font-semibold x:text-white x:shadow-sm x:hover:bg-gray-700 x:dark:bg-gray-200 x:dark:text-gray-800 x:dark:hover:bg-gray-300"
          >
            View PDF
          </a>
          <a
            href="/static/WillMruzekResumeShort.pdf"
            className="x:rounded x:bg-gray-200 x:px-3 x:py-1 x:text-xs x:font-semibold x:text-gray-800 x:shadow-sm x:hover:bg-gray-300 x:dark:bg-gray-700 x:dark:text-gray-100 x:dark:hover:bg-gray-600"
          >
            View Short PDF
          </a>
        </div>
      </header>

      <section className="x:mb-(--resume-baseline-step)">
        <h2 className="x:mb-(--resume-baseline-step) x:text-xs x:leading-(--resume-baseline-step) x:font-semibold x:tracking-widest x:text-gray-500 x:uppercase x:dark:text-gray-400">
          Summary
        </h2>
        <p className="x:text-base x:leading-(--resume-baseline-step) x:whitespace-pre-line x:text-gray-900 x:dark:text-gray-100 x:print:text-sm">
          {summary.trim()}
        </p>
      </section>

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
          <div className="x:text-xs x:leading-(--resume-baseline-step) x:text-gray-400">
            {education.year}
            {education.grade && ` · GPA ${education.grade}`}
          </div>
        </div>
      </section>
    </div>
  );
}
