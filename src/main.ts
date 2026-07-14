import { Actor } from 'apify';
import { createCrawler } from './crawler.js';
import { ScraperInput } from './config.js';

await Actor.init();

try {
    const input = await Actor.getInput<ScraperInput>();
    
    // Validate required fields
    if (!input?.startUrls || input.startUrls.length === 0) {
        throw new Error('No start URLs provided!');
    }

    console.log('Starting Actor with input:', {
        urlCount: input.startUrls.length,
        maxItems: input.maxItems || 'unlimited',
    });

    await Actor.charge({ eventName: 'apify-actor-start', count: 1 });

    const crawler = await createCrawler(input);
    
    const requests = input.startUrls.map(req => ({
        url: req.url,
        label: req.url.includes('/annonce/') ? 'DETAIL' : 'SEARCH'
    }));

    await crawler.run(requests);

    console.log('Scraping completed successfully!');
} catch (error) {
    console.error('Actor failed:', error);
    throw error;
} finally {
    await Actor.exit();
}
