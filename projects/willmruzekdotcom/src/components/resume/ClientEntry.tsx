import type { ResumeClient } from "@/lib/resume-schema";

import clsx from "clsx";

import { EngagementMeta } from "./EngagementMeta";
import {
  resumeMetaLineClassName,
  resumeTechStackSurroundClassName,
} from "./resumeMetaLine";

export function ClientEntry({ client }: { client: ResumeClient }) {
  return (
    <div className="x:mt-(--resume-baseline-step)">
      <EngagementMeta
        company={client.company}
        via={client.via}
        duration={client.duration}
      />
      {client.tech && (
        <p
          className={clsx(
            resumeMetaLineClassName,
            resumeTechStackSurroundClassName,
          )}
        >
          {client.tech.join(", ")}
        </p>
      )}
      <ul
        className={clsx(
          "x:list-disc x:space-y-0 x:pl-4 x:text-sm x:leading-(--resume-baseline-step) x:text-gray-900 x:dark:text-gray-100",
          client.tech ? "x:mt-0" : "x:mt-(--resume-baseline-step)",
        )}
      >
        {client.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
