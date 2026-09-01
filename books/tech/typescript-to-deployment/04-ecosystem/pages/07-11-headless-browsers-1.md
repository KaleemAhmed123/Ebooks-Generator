## Headless browsers

- Some jobs need a real browser on the server: rendering an invoice to PDF with proper CSS, screenshotting a page, or scraping a site that builds its markup in JavaScript
- A **headless browser** is Chrome or Firefox running with no window, driven from code
- It is the heaviest tool in this booklet. Each instance is a real browser using hundreds of megabytes

```bash
npm i playwright
```

```ts
import { chromium } from "playwright"

const browser = await chromium.launch()
const page = await browser.newPage()

await page.setContent(html, { waitUntil: "networkidle" })
const pdf = await page.pdf({ format: "A4", printBackground: true })

await browser.close()
```

| | Playwright | Puppeteer |
|---|---|---|
| Browsers | Chromium, Firefox, WebKit | Chromium, some Firefox |
| Waiting | auto-waits for elements | mostly manual |
| Testing | a full test runner included | driving only |
