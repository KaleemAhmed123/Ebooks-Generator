## Caching and Cache Components

Caching is the single hardest thing about the App Router, and the reason is historical. Next.js has changed its default three times, so most of what you will read online is describing a version that no longer behaves that way.

Here is the honest timeline, because knowing which era an article came from is how you avoid being misled by it.

| Version | What `fetch()` did by default |
|---|---|
| 13, 14 | cached forever, silently |
| 15 | not cached, you opt in |
| 16 | not cached, and caching is a directive rather than a fetch option |

The version 13 default caused real damage. A team would ship, change a row in the database, and the site would keep serving the old value until the next deploy. Nothing in the code said "cache this." The framework did it for you.

Version 15 flipped it. Version 16 finished the job with **Cache Components**.
