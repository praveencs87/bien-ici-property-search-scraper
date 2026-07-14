export interface ScraperInput {
    startUrls: Array<{
        url: string;
    }>;
    maxItems?: number;
    proxyConfiguration?: {
        useApifyProxy?: boolean;
        apifyProxyGroups?: string[];
        apifyProxyCountry?: string;
    };
    debugMode?: boolean;
}
export interface OutputData {
    url: string;
    title: string;
    price: string;
    location: string;
    area: string;
    rooms: string;
    propertyType: string;
    description: string;
    agencyName: string;
    photos: string[];
    scrapedAt: string;
}
export declare const SELECTORS: {
    LISTING_ITEM: string;
    LINK: string;
    DETAIL_TITLE: string;
    DETAIL_PRICE: string;
    DETAIL_LOCATION: string;
    DETAIL_AREA: string;
    DETAIL_ROOMS: string;
    DETAIL_TYPE: string;
    DETAIL_DESC: string;
    DETAIL_AGENCY: string;
    DETAIL_PHOTOS: string;
    PAGINATION_NEXT: string;
};
export declare const CONFIG: {
    MAX_RETRIES: number;
    REQUEST_TIMEOUT: number;
    MAX_CONCURRENCY: number;
};
