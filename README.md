# Bien'ici Property Search Scraper

**Scrape real estate listings, prices, sizes, and agency details from Bien'ici (France) to fuel your market research and lead generation.**

The Bien'ici Scraper allows you to extract detailed property data from one of France's largest real estate platforms. Whether you are an investor looking for market trends or an agency searching for properties, this actor provides structured, high-quality data.

## What can Bien'ici Property Search Scraper do?

- ✅ **Extract property details** - Price, location, square meters, number of rooms, and property type.
- ✅ **Agency information** - Get the name of the agency listing the property.
- ✅ **Photos and descriptions** - Retrieve image URLs and full property descriptions.
- ✅ **Export formats** - JSON, CSV, Excel, HTML.
- ✅ **Integrations** - API, webhooks, Make, Zapier.
- ✅ **No coding required** - Simple interface.

## Why scrape Bien'ici?

Bien'ici contains valuable real estate data for:

- 🎯 **Market analysis** - Track housing prices and trends across different French cities.
- 📊 **Investment opportunities** - Find underpriced properties or specific asset classes.
- 📍 **Lead generation** - Connect with agencies listing specific types of properties.

## What data can you extract from Bien'ici?

| Data Field | Description | Example |
|------------|-------------|---------|
| **url** | Link to the property | "https://www.bienici.com/annonce/..." |
| **title** | Title of the listing | "Appartement 3 pièces 65 m²" |
| **price** | Property price | "350 000 €" |
| **location** | Property location | "Paris 11e Arrondissement" |
| **area** | Square meters | "65 m²" |
| **rooms** | Number of rooms | "3 pièces" |
| **description** | Full text description | "Bel appartement lumineux..." |
| **agencyName** | Real estate agency | "Century 21" |
| **photos** | List of image URLs | `["https://..."]` |

## How to scrape Bien'ici data

1. **Click "Try for free"** to start.
2. **Enter your input** - Provide a search URL from Bien'ici.
3. **Configure options** - Set the maximum number of items.
4. **Start the scraper** - Click Start.
5. **Download results** - Export as JSON, CSV, Excel.

## Input

Brief description of input. Click **Input** tab for all options.

Key settings:
- **Start URLs** - List of Bien'ici search URLs (e.g., `https://www.bienici.com/recherche/achat/paris-75000`).
- **Max Items** - Maximum number of properties to extract.
- **Proxy Configuration** - Residential proxies (French location) are highly recommended.

## Output

You can download data in multiple formats:
- **JSON** - For developers.
- **CSV** - For Excel.
- **Excel** - Ready-to-use spreadsheet.

### Output example

```json
{
    "url": "https://www.bienici.com/annonce/123456789",
    "title": "Appartement 3 pièces 65 m²",
    "price": "350 000 €",
    "location": "Paris 11e Arrondissement",
    "area": "65 m²",
    "rooms": "3 pièces",
    "propertyType": "Appartement",
    "description": "Bel appartement lumineux situé au 3ème étage sans ascenseur...",
    "agencyName": "Agence Immobilière Parisienne",
    "photos": [
        "https://v.seloger.com/s/crop/590x330/visuels/1/2/3/4/123456789.jpg"
    ],
    "scrapedAt": "2026-07-14T12:00:00.000Z"
}
```

## How much does it cost to scrape Bien'ici?

**Cost estimates**:
This actor operates on a Pay-Per-Event (PPE) model:
- You pay **$0.05 per 1,000 runs** (Start event).
- You pay **$2.00 per 1,000 properties** extracted.

**Tips to reduce costs**:
- Limit `maxItems` to only extract what you need.
- Use specific search URLs with strict filters.

## Is it legal to scrape Bien'ici?

Yes, scraping publicly available data is legal. This Actor only extracts public real estate listings.

**Best practices**:
- Use ethically.
- Respect rate limits.
- Review target site's ToS.

## Integrations

Connect with 1000+ apps:
- **Google Sheets** - Auto-update spreadsheets.
- **Slack** - Get notifications.
- **Webhooks** - Send to your apps.
- **API** - Programmatic access.

---

**License**: Apache-2.0 | **Version**: 1.0.0
