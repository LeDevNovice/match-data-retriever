import checkCommandLineArgs from './utils/checkCommandLineArgs';
import { processMatchesInBatches } from './controllers/batchProcessor';
import retrieveHistoricalOdds from './retrieveHistoricalOdds';

const MAX_API_CALLS_PER_DAY = 100;
const API_CALLS_PER_MATCH = 10;
const MAX_MATCHES_PER_DAY = Math.floor(MAX_API_CALLS_PER_DAY / API_CALLS_PER_MATCH);
const BATCH_SIZE = MAX_MATCHES_PER_DAY;

async function main(): Promise<void> {
  try {
    const { country, league, year } = checkCommandLineArgs();
    await retrieveHistoricalOdds(country, league, year);
    await processMatchesInBatches(BATCH_SIZE);
  } catch (error) {
    console.error('Unexpected error occurred:', error);
    process.exit(1);
  }
}

main();
