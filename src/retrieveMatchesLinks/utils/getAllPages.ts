import { Page } from 'puppeteer';

/**
 * Retrieves all the page numbers displayed on a given webpage.
 */
export default async function getAllPages(page: Page): Promise<string[]> {
  try {
    await page.waitForSelector('a.pagination-link');

    const pages: string[] = await page.$$eval('a.pagination-link', (els: Element[]) =>
      els
        .map((el: Element) => el.textContent?.trim())
        .filter((text): text is string => !!text && text !== 'Next'),
    );

    if (pages.length === 0) {
      throw new Error('No pagination links found on the page.');
    }

    return pages;
  } catch (error) {
    console.error(`Failed to retrieve pagination links: ${error}`);
    throw new Error(`Error when retrieving pagination links: ${error}`);
  }
}
