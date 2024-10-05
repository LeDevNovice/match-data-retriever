import { CommandLineArgs } from '../models/interfaces/commandLineArgs.interface';

/**
 * Checks and validate command-line arguments for country, league, and year.
 */
export default function checkCommandLineArgs(): CommandLineArgs {
  const args = process.argv.slice(2);

  const [country, league, year] = args;

  if (!country || !league || !year) {
    throw new Error('Error: country, league, and year must be provided as arguments.');
  }

  if (!/^\d{4}$/.test(year)) {
    throw new Error('Error: year must be a valid four-digit number.');
  }

  return { country, league, year };
}
