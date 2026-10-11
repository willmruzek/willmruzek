/**
 * Shared resume “meta line” styles. Spacing uses `--resume-baseline-step`, set only on
 * `.resume-rhythm-root`
 */
export const resumeMetaLineClassName =
  "x:text-xs x:leading-(--resume-baseline-step) x:text-gray-500 x:dark:text-gray-400";

/** Wrapping tech badges retain one baseline step of spacing above and below. */
export const resumeTechStackSurroundClassName =
  "x:my-(--resume-baseline-step) x:flex x:flex-wrap x:gap-x-1.5 x:gap-y-1";
