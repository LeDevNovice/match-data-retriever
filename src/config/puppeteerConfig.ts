import { Browser } from 'puppeteer';
import puppeteerExtra from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteerExtra.use(stealthPlugin());

/**
 * Launches a new instance of a Puppeteer browser with stealth mode enabled.
 */
export default async function launchBrowser(): Promise<Browser> {
  try {
    const browser = await puppeteerExtra.launch({
      headless: true,
    });
    console.info('Browser launched successfully.');
    return browser;
  } catch (error) {
    console.error(`Failed to launch the browser: ${error}`);
    throw new Error(`Browser launch error: ${error}`);
  }
}
