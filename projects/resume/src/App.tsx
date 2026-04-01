import type { ResumeExperience, ResumeProject } from './data/resume.ts';
import { resume } from './data/resume.ts';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function parseMonthYear(s: string): Date {
  const [mon, year] = s.split(' ');
  return new Date(Number(year), MONTHS.indexOf(mon));
}

function formatDuration(
  startDate: string,
  endDate: string | undefined,
): string {
  const start = parseMonthYear(startDate);
  const end = endDate ? parseMonthYear(endDate) : new Date();
  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  return parts.join(' ');
}

function ProjectEntry({ project }: { project: ResumeProject }) {
  return (
    <div className="mt-6">
      <div className="flex items-baseline justify-between gap-x-4">
        <div className="flex items-baseline gap-2">
          <span className="font-medium text-slate-800">{project.company}</span>
          {project.via && (
            <span className="text-xs text-slate-500">
              via{' '}
              <a
                href="https://www.uplift.ltd/"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                {project.via}
              </a>
            </span>
          )}
        </div>
        {project.duration && (
          <span className="text-xs text-slate-500">{project.duration}</span>
        )}
      </div>
      {project.tech && (
        <p className="mt-3 border-l border-slate-800 pl-2 text-xs leading-6 text-slate-800">
          {project.tech.join(', ')}
        </p>
      )}
      <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-6 text-slate-800">
        {project.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function ExperienceEntry({ exp }: { exp: ResumeExperience }) {
  const duration = formatDuration(exp.startDate, exp.endDate);
  const dateRange = `${exp.startDate} – ${exp.endDate ?? 'Present'} · ${duration}`;
  return (
    <div
      className={`break-inside-avoid${exp.pageBreak ? ' break-before-page' : ''}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <div>
          <span className="font-semibold text-slate-900">{exp.title}</span>
          <span className="mx-1 text-slate-400">·</span>
          <span className="text-slate-700">{exp.company}</span>
        </div>
        <span className="text-xs text-slate-500">{dateRange}</span>
      </div>
      {exp.location && <p className="text-sm text-slate-500">{exp.location}</p>}
      {exp.tech && (
        <p className="mt-3 border-l border-slate-800 pl-2 text-xs leading-6 text-slate-800">
          {exp.tech.join(', ')}
        </p>
      )}
      {exp.bullets && (
        <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-6 text-slate-800">
          {exp.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
      {exp.projects && exp.projects.length > 0 && (
        <div className="mt-6 pl-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Projects
          </div>
          {exp.projects.map((p, i) => (
            <ProjectEntry key={i} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
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
    <>
      <div className="print:hidden sticky top-0 z-50 flex items-center justify-end bg-slate-800 px-6 py-3 shadow-lg">
        <a
          href="/resume.pdf"
          download
          className="rounded bg-white px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm hover:bg-slate-100"
        >
          Download PDF
        </a>
      </div>
      <div className="mx-auto max-w-3xl px-6 py-12 font-sans text-slate-900">
      {/* Header */}
      <header className="mb-6 border-b border-slate-300 pb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-slate-900">
              {name}
            </h1>
            <p className="mt-2 text-sm text-slate-500">{headline}</p>
          </div>
          <div className="text-right text-xs text-slate-500 leading-normal shrink-0">
            <div>{email}</div>
            <div>{location}</div>
          </div>
        </div>
        <p className="mt-2 text-sm text-slate-500">{topSkills.join(', ')}</p>
      </header>

      {/* Summary */}
      <section className="mb-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Summary
        </h2>
        <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
          {summary.trim()}
        </p>
      </section>

      {/* AI Tools */}
      <section className="mb-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Current AI Tools
        </h2>
        <p className="text-sm text-slate-600">{aiTools.join(', ')}</p>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Experience
        </h2>
        <div className="space-y-6">
          {experience.map((exp, i) => (
            <ExperienceEntry key={i} exp={exp} />
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Education
        </h2>
        <div>
          <div className="font-semibold text-slate-900">{education.school}</div>
          <div className="text-sm text-slate-600">{education.degree}</div>
          <div className="text-xs text-slate-400">
            {education.year}
            {education.grade && ` · GPA ${education.grade}`}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

export default App;
