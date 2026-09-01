# Module 14: Performance

## Core Web Vitals (CWV)

In the early days of the web, performance was measured by a single metric: `window.onload` (how many seconds it took for the spinning wheel in the browser tab to stop).

This metric is completely useless today. A Single Page Application (SPA) might "load" in 0.5 seconds, but display a blank white screen for 5 seconds while it fetches JavaScript and API data. 

To create a standardized way of measuring *perceived* performance, Google introduced **Core Web Vitals**. If your Core Web Vitals are poor, Google will actively penalize your website's search ranking (SEO).

### 1. Largest Contentful Paint (LCP)
**What it measures:** Loading speed. Specifically, how long it takes for the *largest* element on the screen (usually a hero image, a video, or a massive block of text) to become visible to the user.
**The Goal:** Less than **2.5 seconds**.
**How to fix a bad LCP:**
- If your LCP is an image, you must preload it in the `<head>` of your HTML document. 
- Ensure the image is correctly sized and compressed (e.g., using WebP or AVIF formats).
- Use Server-Side Rendering (SSR) so the HTML is delivered instantly, rather than waiting for Client-Side React to fetch the data.

### 2. Cumulative Layout Shift (CLS)
**What it measures:** Visual stability. Have you ever been reading an article on your phone, and suddenly an ad loads at the top of the page, pushing all the text down so you lose your place? That is a Layout Shift.
**The Goal:** A score of less than **0.1**.
**How to fix a bad CLS:**
- Never render an `<img>` tag without explicit `width` and `height` attributes. Even if the image takes 3 seconds to load, the browser will reserve the exact blank space for it, preventing text from shifting.
- When fetching data for a list, render a "Skeleton Loader" (a gray box) that is exactly the same height as the final list items.
