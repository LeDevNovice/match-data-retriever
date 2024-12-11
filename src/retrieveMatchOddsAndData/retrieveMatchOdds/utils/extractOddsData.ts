import { Page } from 'puppeteer';

import { BookmakerOdds } from '../../../models/interfaces/matchOddsData.interface';

/**
 * Extracts odds data from the provided Puppeteer page element.
 */
export default async function extractOddsData(page: Page): Promise<BookmakerOdds[]> {
  const rowsSelector = 'div.border-black-borders.flex.h-9.border-b.border-l.border-r.text-xs';

  try {
    const oddsData = await page.$$eval(rowsSelector, (els: Element[]): BookmakerOdds[] =>
      els.map((el: Element) => {
        const [bookMakerName, homeWinStr, drawStr, awayWinStr] = Array.from(
          el.querySelectorAll('p'),
        ).map((element: Element) => (element.textContent || '').trim());
        return {
          bookMakerName,
          homeWin: parseFloat(homeWinStr),
          draw: parseFloat(drawStr),
          awayWin: parseFloat(awayWinStr),
        };
      }),
    );

    return oddsData;
  } catch (error) {
    console.error('Error extracting odds data:', error);
    throw new Error('Failed to extract odds data');
  }
}
