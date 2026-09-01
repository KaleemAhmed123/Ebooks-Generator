### Origin access

- For an S3 origin, use **Origin Access Control** so the bucket stays private and only CloudFront may read it
- For an ALB origin, add a **secret header** that CloudFront sends and the ALB requires, or clients can bypass the CDN and the WAF with it

### Invalidation

- **Invalidations are slow and the first thousand a month are free.** Fingerprinted filenames need none at all
- **Deploy new files under new names**, then update the HTML. That is the pattern that avoids invalidation entirely
