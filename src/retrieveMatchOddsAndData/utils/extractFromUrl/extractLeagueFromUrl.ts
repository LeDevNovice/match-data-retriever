/**
 * Extracts the league name from the given URL.
 */
export function extractLeagueFromUrl(url: string): string {
  const regex = /football\/.*\/(.*?)-\d{4}-\d{4}/;
  const match = url.match(regex);

  return match ? match[1] : 'ligue-1';
}
