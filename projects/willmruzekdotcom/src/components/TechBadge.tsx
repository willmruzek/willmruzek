/** Shared tech pill uses resume rhythm when available, otherwise a 24px line height. */
export function TechBadge({ children }: { readonly children: string }) {
  return (
    <span className="x:inline-flex x:items-center x:rounded-sm x:bg-[#eaf3ff] x:px-2 x:text-xs x:leading-(--resume-baseline-step,1.5rem) x:text-[#506b90] x:dark:bg-[#253c5c] x:dark:text-[#c3d8f4] x:print:bg-[#eaf3ff] x:print:text-[#506b90] x:print:[print-color-adjust:exact]">
      {children}
    </span>
  );
}
