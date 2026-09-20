## The bot problem

- Ticketing systems are a prime target for scalpers. If a Taylor Swift ticket costs $100 and can be resold for $1000, scalpers will deploy massive botnets to buy the entire inventory in 2 seconds, completely bypassing the CDN waiting room using thousands of residential proxies
- To fight bots, Ticketmaster uses **Defense in Depth**:
  1. **Verified Fan Pre-registration**: Users must register a week in advance and verify their phone number. They are given a cryptographically signed JWT token. The CDN waiting room drops all requests lacking this token.
  2. **Proof of Work**: During the checkout flow, the browser must solve a computationally expensive Captcha or run an obfuscated JavaScript payload that takes 2 seconds to compute. This slows down bots.
  3. **ML Rate Limiting**: AI models analyze mouse movements and click timings. If a user perfectly clicks "Add to Cart" 1 millisecond after the page loads, they are flagged and shadow-banned.

:::interview
**Defense in depth against bots**
In an interview, do not say "I will use Cloudflare rate limiting." Advanced bots rotate through millions of residential IP addresses (like hijacked home routers). IP rate limiting is useless. You must explain defense in depth: pre-registration, proof of work, and behavioral analysis.
:::

### The failure

- Relying purely on IP-based rate limiting. If you block an IP after 100 requests per minute, a botnet operator with 50,000 residential proxies will simply send 99 requests per minute from each proxy, easily consuming all 50,000 tickets without triggering a single block
