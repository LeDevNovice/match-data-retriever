import launchBrowser from '../config/puppeteerConfig';

import collectMatchLinks from './utils/collectMatchLinks';
import getAllPages from './utils/getAllPages';
import { saveMatchLinks } from './utils/saveMatchLinks';
import scrollToBottom from '../common/scrollToBottom';

/**
 * Retrieves historical match URLs for a given country, league, and year.
 */
export default async function retrieveMatchesLinks(
  country: string,
  league: string,
  year: string,
): Promise<void> {
  const browser = await launchBrowser();
  const url = `https://www.oddsportal.com/football/${country}/${league}-${year}-${+year + 1}/results/`;

  console.info(`Starting match URL collection for: ${url}`);

  try {
    const page = await browser.newPage();
    await page.goto(url);
    await scrollToBottom(page);

    const pages: string[] = await getAllPages(page);
    const allMatchLinks: string[] = [];

    for (const pageNumber of pages) {
      const pageUrl = `${url}#/page/${pageNumber}`;
      console.info(`Collecting links from page: ${pageUrl}`);

      const matchLinks = await collectMatchLinks(page, pageUrl);
      allMatchLinks.push(...matchLinks);
    }

    await saveMatchLinks(allMatchLinks);
  } catch (error) {
    console.error(`Error occurred during match URL collection: ${error}`);
    throw error;
  } finally {
    await browser.close();
  }
}
