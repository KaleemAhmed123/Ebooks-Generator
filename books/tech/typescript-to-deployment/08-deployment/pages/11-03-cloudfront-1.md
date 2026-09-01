## CloudFront

- A **content delivery network** puts copies of your responses in data centers near users. A request from Delhi is answered from Delhi rather than from Mumbai or Virginia
- **It also terminates TLS at the edge**, so the slow part of a connection happens close to the user even for content it does not cache
- That second point is why a CDN in front of a dynamic API is worth it even at a zero percent cache hit rate

```bash
aws cloudfront create-distribution --distribution-config file://dist.json

aws cloudfront create-invalidation --distribution-id E123 --paths '/index.html' '/api/config'

aws cloudfront get-distribution --id E123 --query 'Distribution.Status'
```

### What to cache, and what not to

| Path | Policy |
|---|---|
| `/assets/*` fingerprinted | cache a year, `immutable` |
| `/index.html` | cache briefly, or not at all |
| `/api/*` authenticated | **`CachingDisabled`**, forward all headers and cookies |
| `/api/*` public, slow | cache 60 seconds. A large win on a hot endpoint |

- **The cache key is the thing to get right.** Forwarding every header means a hit rate near zero; forwarding none means a personalised response served to strangers
- **A cached authenticated response is a data leak.** Use the managed `CachingDisabled` policy on anything behind a login and be certain
