import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import loadProcessedMatches from './utils/loadProcessedMatches';
import saveProcessedMatch from './utils/saveProcessedMatches';
import retrieveMatchOddsAndData from '../retrieveMatchOddsAndData/retrieveMatchOddsAndData';

/**
 * Processes matches scraping in batches.
 */
export default async function processMatchesInBatches(batchSize: number): Promise<void> {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const filePath = path.resolve(__dirname, '../retrieveMatchesLinks/utils/match_links.json');
  const links: string[] = JSON.parse(await fs.promises.readFile(filePath, 'utf-8'));

  const processedMatches = await loadProcessedMatches();

  // Filter out already processed matches
  const pendingLinks = links.filter((link) => !processedMatches.includes(link));

  // Process matches in batches
  for (let i = 0; i < pendingLinks.length; i += batchSize) {
    const batch = pendingLinks.slice(i, i + batchSize);

    for (const matchUrl of batch) {
      await retrieveMatchOddsAndData(`https://www.oddsportal.com${matchUrl}`);
      await saveProcessedMatch(matchUrl);

      // Attendre 1 minute (60000 ms) avant de traiter le prochain matchUrl
      await sleep(60000);
    }

    console.log(`Processed batch ${i / batchSize + 1}`);
  }
}
