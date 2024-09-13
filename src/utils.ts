import playwright from "playwright-aws-lambda";
import { Page } from "playwright-core";

export async function getHtmlContent(
  url: string,
  target?: string,
): Promise<string> {
  const browser = await playwright.launchChromium({
    headless: true,
    executablePath: process.env.IS_LOCAL ? "/bin/google-chrome" : undefined,
  });

  try {
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle" });

    await autoScroll(page);

    if (target) {
      await page.waitForSelector(target, { timeout: 10_000 });
    }

    const html = await page.content();
    return html;
  } catch (error) {
    console.error(`Error fetching HTML content: ${error}`);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function autoScroll(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const delay = 100;

      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        const scrollHeight = document.body.scrollHeight;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, delay);
    });
  });
}

export function convertRatingToNumber(rating: string): number {
  const fullStars = (rating.match(/★/g) || []).length;
  const hasHalfStar = rating.includes("½");

  return fullStars + (hasHalfStar ? 0.5 : 0);
}

export function parseDateString(dateString: string): Date | undefined {
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return date;
  }

  // If dateString is like "12 September 2024", convert it
  const regex = /(\d+)\s+(\w+)\s+(\d{4})/;
  const match = dateString.match(regex);
  if (match) {
    const day = parseInt(match[1], 10);
    const monthName = match[2];
    const year = parseInt(match[3], 10);
    const month = new Date(`${monthName} 1, ${year}`).getMonth();
    const parsedDate = new Date(year, month, day);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }

  return undefined;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
