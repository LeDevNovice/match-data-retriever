import { Page } from 'puppeteer';

/**
 * Scrolls the page to the bottom to ensure that all content is loaded.
 */
export default async function scrollToBottom(page: Page): Promise<void> {
  try {
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });

    console.info('Successfully scrolled to the bottom of the page.');
  } catch (error) {
    console.error(`Error during scroll operation: ${error}`);
    throw new Error(`Scroll to bottom failed: ${error}`);
  }
}
