import type { ResumeEngagement } from "@/lib/resume-schema";

import clsx from "clsx";

import { EngagementMeta } from "./EngagementMeta";
import {
  resumeMetaLineClassName,
  resumeTechStackSurroundClassName,
} from "./resumeMetaLine";

export function OtherEngagementEntry({
  engagement,
}: {
  engagement: ResumeEngagement;
}) {
  return (
    <div className="x:mt-(--resume-baseline-step)">
      <EngagementMeta
        company={engagement.company}
        via={engagement.via}
        duration={engagement.duration}
      />
      {engagement.tech && (
        <p
          className={clsx(
            resumeMetaLineClassName,
            resumeTechStackSurroundClassName,
          )}
        >
          {engagement.tech.join(", ")}
        </p>
      )}
    </div>
  );
}
