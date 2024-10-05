import { Page } from 'puppeteer';

import { BookmakerOdds, MatchOddsData } from '../../models/interfaces/matchOddsData.interface';
import extractOddsData from './utils/extractOddsData';

/**
 * Scrapes match odds data from a given match link.
 */
export default async function retrieveMatchOdds(
  page: Page,
  link: string,
): Promise<any> {
  try {
    await page.goto(link);
    await page.waitForSelector('div.bg-event-start-time');

    // Extract date and time
    const [day, date, time] = await page.$$eval('div.bg-event-start-time ~ p', (elements) =>
      elements.map((el) => el.textContent?.trim() || ''),
    );

    // Extract teams
    const [homeTeam, awayTeam] = await page.$$eval('span.truncate', (elements) =>
      elements.map((el) => el.textContent?.trim() || ''),
    );

    // Extract score
    const score = await page.$eval(
      'div.flex.flex-wrap strong',
      (element) => element.textContent?.trim() || 'No score',
    );

    // Extract odds data
    const oddsArray: BookmakerOdds[] = await extractOddsData(page);

    return {
      day,
      date,
      time,
      homeTeam,
      awayTeam,
      score,
      odds: oddsArray,
    };
  } catch (error) {
    console.error(`Error scraping match odds from ${link}: ${error}`);
    return null;
  }
}
