import launchBrowser from '../config/puppeteerConfig';

/**
 * Retrieves historical match URLs for a given country, league, and year.
 */
export default async function retrieveHistoricalOdds(
  country: string,
  league: string,
  year: string,
): Promise<void> {
  const browser = await launchBrowser(); // TO-DO - Add parameters for launching puppeteer browser
  const url = `https://www.oddsportal.com/football/${country}/${league}-${year}-${+year + 1}/results/`;

  console.info(`Starting match URL collection for: ${url}`);

  try {
    const page = await browser.newPage();
    await page.goto(url);
    await scrollToBottom(page); // TO-DO - Add function to go to the end of the page to load the full content of the page

    const pages: string[] = await getAllPages(page); // TO-DO - Retrieve all the pages numbers of the pagination
    const allMatchLinks: string[] = [];

    for (const pageNumber of pages) {
      const pageUrl = `${url}#/page/${pageNumber}`;
      console.info(`Collecting links from page: ${pageUrl}`);

      const matchLinks = await collectMatchLinks(page, pageUrl); // TO-DO - Retrieve all the links of each matches
      allMatchLinks.push(...matchLinks);
    }

    await saveMatchLinks(allMatchLinks); // TO-DO - Save match links to a file for batch processing
  } catch (error) {
    console.error(`Error occurred during match URL collection: ${error}`);
    throw error;
  } finally {
    await browser.close();
  }
}
