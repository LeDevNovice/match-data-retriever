/**
 * Converts a date string into the format 'YYYY-MM-DD'.
 */
export function convertDateFormat(date: string): string {
  const newDate = new Date(date);

  if (isNaN(newDate.getTime())) {
    return date; // Return the original date if parsing fails
  }

  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const day = String(newDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
