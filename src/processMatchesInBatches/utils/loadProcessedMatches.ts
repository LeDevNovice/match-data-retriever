import fs from 'fs';
import path from 'path';

export default async function loadProcessedMatches(): Promise<string[]> {
  const filePath = path.resolve(__dirname, 'processed_matches.json');

  if (!fs.existsSync(filePath)) {
    return [];
  }

  return JSON.parse(await fs.promises.readFile(filePath, 'utf-8'));
}
