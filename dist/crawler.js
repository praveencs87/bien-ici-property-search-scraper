import { PlaywrightCrawler } from 'crawlee';
import { Actor } from 'apify';
import { CONFIG, SELECTORS } from './config.js';
import { handleDetailPage } from './handlers/detailHandler.js';
export async function createCrawler(input) {
    const state = { extractedCount: 0 };
    // Add realistic behavior plugins if available
    const { chromium } = await import('playwright');
    return new PlaywrightCrawler({
        proxyConfiguration: await Actor.createProxyConfiguration(input.proxyConfiguration || { useApifyProxy: true, apifyProxyCountry: 'FR' }),
        maxConcurrency: CONFIG.MAX_CONCURRENCY,
        maxRequestRetries: CONFIG.MAX_RETRIES,
        requestHandlerTimeoutSecs: CONFIG.REQUEST_TIMEOUT / 1000,
        browserPoolOptions: {
            useFingerprints: true,
        },
        launchContext: {
            launcher: chromium,
            launchOptions: {
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-blink-features=AutomationControlled',
                ],
            },
        },
        requestHandler: async (context) => {
            const { request, page, log, enqueueLinks } = context;
            if (input.maxItems && state.extractedCount >= input.maxItems) {
                log.info('Max items reached, skipping request.');
                return;
            }
            log.info(`Processing: ${request.url}`);
            const title = await page.title();
            if (title.includes('Attention Required') || title.includes('Just a moment') || title.includes('Access Denied')) {
                throw new Error('Blocked by WAF (Cloudflare/PerimeterX). Retrying...');
            }
            if (request.userData.label === 'DETAIL') {
                await handleDetailPage(context, input, state);
            }
            else {
                // Handle search page
                log.info(`Parsing search page: ${request.url}`);
                try {
                    // Wait for listings to load
                    await page.waitForSelector(SELECTORS.LISTING_ITEM, { timeout: 15000 });
                }
                catch (e) {
                    log.warning('Timeout waiting for listings to load. Might be an empty page or captcha.');
                }
                // Scroll to load all items if lazy loaded
                await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
                await page.waitForTimeout(2000);
                // Enqueue detail pages
                const enqueued = await enqueueLinks({
                    selector: SELECTORS.LINK,
                    label: 'DETAIL',
                });
                log.info(`Enqueued ${enqueued.processedRequests.length} properties from search page.`);
                // Pagination
                if (!input.maxItems || state.extractedCount + enqueued.processedRequests.length < input.maxItems) {
                    const nextButton = await page.$(SELECTORS.PAGINATION_NEXT);
                    if (nextButton) {
                        const nextUrl = await nextButton.getAttribute('href');
                        if (nextUrl) {
                            const fullUrl = new URL(nextUrl, 'https://www.bienici.com').toString();
                            log.info(`Enqueuing next page: ${fullUrl}`);
                            await enqueueLinks({
                                urls: [fullUrl],
                                label: 'SEARCH'
                            });
                        }
                    }
                }
            }
        },
        failedRequestHandler: async ({ request, log }, error) => {
            log.error(`Request failed completely: ${request.url}`, {
                error: error.message,
            });
        },
    });
}
//# sourceMappingURL=crawler.js.map