/**
 * Extracts the starting year from the given URL.
 */
export function extractYearFromUrl(url: string): string | null {
  const regex = /-(\d{4})-\d{4}/;
  const match = url.match(regex);

  return match ? match[1] : null;
}
