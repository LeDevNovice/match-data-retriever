import fs from 'fs';
import path from 'path';

import loadProcessedMatches from './loadProcessedMatches';
import { fileURLToPath } from 'url';

export default async function saveProcessedMatch(matchUrl: string): Promise<void> {
  const processedMatches = await loadProcessedMatches();
  processedMatches.push(matchUrl);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.resolve(__dirname, 'processed_matches.json');
  await fs.promises.writeFile(filePath, JSON.stringify(processedMatches, null, 2), 'utf-8');
}
