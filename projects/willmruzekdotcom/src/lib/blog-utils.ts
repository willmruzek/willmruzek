export function formatDateForDisplay(dateString: string): string {
  const d = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(d);
}
