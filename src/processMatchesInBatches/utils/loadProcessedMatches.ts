import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export default async function loadProcessedMatches(): Promise<string[]> {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.resolve(__dirname, 'processed_matches.json');

  if (!fs.existsSync(filePath)) {
    return [];
  }

  return JSON.parse(await fs.promises.readFile(filePath, 'utf-8'));
}
