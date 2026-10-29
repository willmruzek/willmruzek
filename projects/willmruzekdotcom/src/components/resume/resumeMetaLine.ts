/**
 * Shared resume “meta line” styles. Spacing uses `--resume-baseline-step`, set only on
 * `.resume-rhythm-root`
 */
export const resumeMetaLineClassName =
  "x:text-xs x:leading-(--resume-baseline-step) x:text-gray-500 x:dark:text-gray-400";

/** Tech badges use the title/company spacing above and one baseline step below. */
export const resumeTechStackSurroundClassName =
  "x:mt-1 x:mb-(--resume-baseline-step) x:flex x:flex-wrap x:gap-x-1.5 x:gap-y-1";
