import { PlaywrightCrawler } from 'crawlee';
import { ScraperInput } from './config.js';
export declare function createCrawler(input: ScraperInput): Promise<PlaywrightCrawler>;
