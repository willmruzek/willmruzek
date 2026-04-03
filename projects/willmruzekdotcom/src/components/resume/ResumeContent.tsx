import type { Resume } from "@/lib/resume-schema";

import { ExperienceEntry } from "./ExperienceEntry";

export function ResumeContent({ resume }: { resume: Resume }) {
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
    <div className="x:mt-[calc(var(--tw-baseline-unit-value-px)*3)] x:print:mt-0">
      {/* Header */}
      <header className="x:mb-(--tw-baseline-unit-value-px) x:border-b x:border-gray-300 x:pb-(--tw-baseline-unit-value-px) x:dark:border-gray-600 x:print:mb-6 x:print:pb-6">
        <div className="x:flex x:items-start x:justify-between x:gap-4">
          <div>
            <h1 className="x:text-4xl x:font-bold x:tracking-tight x:text-gray-900 x:dark:text-gray-100 x:print:text-3xl">
              {name}
            </h1>
            <p className="x:mt-1 x:text-base x:text-gray-500 x:dark:text-gray-400 x:print:mt-1 x:print:text-sm">
              {headline}
            </p>
          </div>
          <div className="x:shrink-0 x:text-right x:text-sm x:leading-(--tw-baseline-unit-value-px) x:text-gray-500 x:dark:text-gray-400 x:print:text-xs x:print:leading-normal">
            <div>{email}</div>
            <div>{location}</div>
          </div>
        </div>
        <div className="x:mt-2 x:flex x:items-center x:justify-between x:gap-4 x:print:mt-2">
          <p className="x:text-sm x:text-gray-500 x:dark:text-gray-400">
            {topSkills.join(", ")}
          </p>
          <a
            href="/static/WillMruzekResume.pdf"
            download
            className="x:shrink-0 x:rounded x:bg-gray-800 x:px-3 x:py-1 x:text-xs x:font-semibold x:text-white x:shadow-sm x:hover:bg-gray-700 x:dark:bg-gray-200 x:dark:text-gray-800 x:dark:hover:bg-gray-300 x:print:hidden"
          >
            Download PDF
          </a>
        </div>
      </header>

      {/* Summary */}
      <section className="x:mb-(--tw-baseline-unit-value-px) x:print:mb-6">
        <h2 className="x:mb-(--tw-baseline-unit-value-px) x:text-xs x:font-semibold x:tracking-widest x:text-gray-500 x:uppercase x:dark:text-gray-400 x:print:mb-3">
          Summary
        </h2>
        <p className="x:text-base x:leading-(--tw-baseline-unit-value-px) x:whitespace-pre-line x:text-gray-900 x:dark:text-gray-100 x:print:text-sm x:print:leading-6">
          {summary.trim()}
        </p>
      </section>

      {/* AI Tools */}
      <section className="x:mb-(--tw-baseline-unit-value-px) x:print:mb-6">
        <h2 className="x:mb-(--tw-baseline-unit-value-px) x:text-xs x:font-semibold x:tracking-widest x:text-gray-500 x:uppercase x:dark:text-gray-400 x:print:mb-3">
          Current AI Tools
        </h2>
        <p className="x:text-base x:text-gray-900 x:dark:text-gray-100 x:print:text-sm">
          {aiTools.join(", ")}
        </p>
      </section>

      {/* Experience */}
      <section className="x:mb-(--tw-baseline-unit-value-px) x:print:mb-6">
        <h2 className="x:mb-(--tw-baseline-unit-value-px) x:text-xs x:font-semibold x:tracking-widest x:text-gray-500 x:uppercase x:dark:text-gray-400 x:print:mb-3">
          Experience
        </h2>
        <div className="x:space-y-(--tw-baseline-unit-value-px) x:print:space-y-6">
          {experience.map((exp, i) => (
            <ExperienceEntry key={i} exp={exp} />
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="x:mb-(--tw-baseline-unit-value-px) x:text-xs x:font-semibold x:tracking-widest x:text-gray-500 x:uppercase x:dark:text-gray-400 x:print:mb-3">
          Education
        </h2>
        <div>
          <div className="x:font-semibold x:text-gray-900 x:dark:text-gray-100">
            {education.school}
          </div>
          <div className="x:text-sm x:text-gray-900 x:dark:text-gray-100">
            {education.degree}
          </div>
          <div className="x:text-xs x:text-gray-400">
            {education.year}
            {education.grade && ` · GPA ${education.grade}`}
          </div>
        </div>
      </section>
    </div>
  );
}
