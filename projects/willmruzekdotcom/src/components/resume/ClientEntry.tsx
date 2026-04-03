import type { ResumeClient } from "@/lib/resume-schema";

import { EngagementMeta } from "./EngagementMeta";

export function ClientEntry({ client }: { client: ResumeClient }) {
  return (
    <div className="x:mt-(--tw-baseline-unit-value-px) x:print:mt-6">
      <EngagementMeta
        company={client.company}
        via={client.via}
        duration={client.duration}
      />
      {client.tech && (
        <p className="x:mt-(--tw-baseline-unit-value-px) x:border-l x:border-gray-400 x:pl-2 x:text-xs x:leading-(--tw-baseline-unit-value-px) x:text-gray-500 x:dark:border-gray-500 x:dark:text-gray-400 x:print:mt-3 x:print:leading-6">
          {client.tech.join(", ")}
        </p>
      )}
      <ul className="x:mt-(--tw-baseline-unit-value-px) x:list-disc x:space-y-(--tw-baseline-unit-value-px) x:pl-4 x:text-base x:leading-(--tw-baseline-unit-value-px) x:text-gray-900 x:dark:text-gray-100 x:print:mt-3 x:print:space-y-2 x:print:text-sm x:print:leading-6">
        {client.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
