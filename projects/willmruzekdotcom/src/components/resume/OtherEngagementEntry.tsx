import type { ResumeEngagement } from "@/lib/resume-schema";

import { EngagementMeta } from "./EngagementMeta";

export function OtherEngagementEntry({
  engagement,
}: {
  engagement: ResumeEngagement;
}) {
  return (
    <div className="x:mt-(--tw-baseline-unit-value-px)">
      <EngagementMeta
        company={engagement.company}
        via={engagement.via}
        duration={engagement.duration}
      />
      {engagement.tech && (
        <p className="x:mt-(--tw-baseline-unit-value-px) x:border-l x:border-gray-400 x:pl-2 x:text-xs x:leading-(--tw-baseline-unit-value-px) x:text-gray-500 x:dark:border-gray-500 x:dark:text-gray-400">
          {engagement.tech.join(", ")}
        </p>
      )}
    </div>
  );
}
