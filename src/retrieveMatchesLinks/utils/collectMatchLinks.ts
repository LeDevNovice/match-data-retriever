import { Page } from 'puppeteer';

/**
 * Collects match links from a given page URL.
 */
export default async function collectMatchLinks(page: Page, pageUrl: string): Promise<string[]> {
  try {
    await page.goto(pageUrl);
    await page.waitForSelector('div.group.flex');

    const links: string[] = await page.$$eval('div.group.flex > a', (elements) =>
      elements.map((el) => el.getAttribute('href')).filter((href): href is string => href !== null),
    );

    // Remove duplicates and return
    return Array.from(new Set(links));
  } catch (error) {
    console.error(`Error collecting match links from ${pageUrl}: ${error}`);
    return [];
  }
}
