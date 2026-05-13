/**
 * Shared resume “meta line” styles. Spacing uses `--resume-baseline-step`, set only on
 * `.resume-rhythm-root`
 */
export const resumeMetaLineClassName =
  "x:text-xs x:leading-(--resume-baseline-step) x:text-gray-500 x:dark:text-gray-400";

/** Left rule beside tech stack lines; margin below restores one baseline step without a bottom border. */
export const resumeTechStackSurroundClassName =
  "x:mt-(--resume-baseline-step) x:mb-(--resume-baseline-step) x:border-l x:border-gray-400 x:pl-2 x:dark:border-gray-500";
