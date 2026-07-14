import { Actor } from 'apify';
import { ScraperInput, OutputData, SELECTORS } from '../config.js';

export async function handleDetailPage(
    context: any,
    input: ScraperInput,
    state: { extractedCount: number }
): Promise<void> {
    const { page, request, log } = context;

    log.info(`Extracting data from: ${request.url}`);

    if (input.maxItems && state.extractedCount >= input.maxItems) {
        log.info('Max items reached. Skipping extraction.');
        return;
    }

    try {
        await page.waitForSelector(SELECTORS.DETAIL_TITLE, { timeout: 15000 });
    } catch (e) {
        log.warning(`Timeout waiting for detail title on ${request.url}`);
    }

    // Extract data
    const title = await page.locator(SELECTORS.DETAIL_TITLE).first().textContent().catch(() => '') || '';
    const price = await page.locator(SELECTORS.DETAIL_PRICE).first().textContent().catch(() => '') || '';
    const location = await page.locator(SELECTORS.DETAIL_LOCATION).first().textContent().catch(() => '') || '';
    const area = await page.locator(SELECTORS.DETAIL_AREA).first().textContent().catch(() => '') || '';
    const rooms = await page.locator(SELECTORS.DETAIL_ROOMS).first().textContent().catch(() => '') || '';
    const propertyType = await page.locator(SELECTORS.DETAIL_TYPE).first().textContent().catch(() => '') || '';
    const description = await page.locator(SELECTORS.DETAIL_DESC).first().textContent().catch(() => '') || '';
    const agencyName = await page.locator(SELECTORS.DETAIL_AGENCY).first().textContent().catch(() => '') || '';
    
    const photosLocator = page.locator(SELECTORS.DETAIL_PHOTOS);
    const photosCount = await photosLocator.count();
    const photos: string[] = [];
    for (let i = 0; i < photosCount; i++) {
        const src = await photosLocator.nth(i).getAttribute('src').catch(() => null);
        if (src) photos.push(src);
    }

    const data: OutputData = {
        url: request.url,
        title: title.trim(),
        price: price.trim(),
        location: location.trim(),
        area: area.trim(),
        rooms: rooms.trim(),
        propertyType: propertyType.trim(),
        description: description.trim(),
        agencyName: agencyName.trim(),
        photos,
        scrapedAt: new Date().toISOString(),
    };

    if (data.title) {
        await Actor.pushData(data);
        await Actor.charge({ eventName: 'lead-extracted', count: 1 });
        state.extractedCount++;
        log.info(`✅ SAVED: ${data.title} (${state.extractedCount}/${input.maxItems || 'unlimited'})`);
    } else {
        log.warning(`Skipped item due to missing title: ${request.url}`);
    }
}
