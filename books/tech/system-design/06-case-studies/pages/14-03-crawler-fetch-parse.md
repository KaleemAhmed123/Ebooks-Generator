## Fetch and parse

- A fetch is a DNS lookup, a connection, a request with timeouts on each step, and a body limit; a parse is a content-type check, link extraction, and URL normalisation. Each step has a rule that comes from the web being hostile, and `robots.txt` has a specification

- **DNS**: a lookup per URL is a round trip to a resolver at 400/s, so results are cached per host with their TTL
- **Timeouts and limits**: connect, first byte and total, each a few seconds, and a cap on body size, so a host that streams forever costs one worker for seconds, not a worker for good
- **Content type**: only `text/html` is parsed for links; a PDF or an image is stored or skipped by policy, never parsed. The header lies sometimes, so the parser must tolerate anything
- **Links**: every `href` is resolved against the page's base URL, then normalised: lower-case scheme and host, default port dropped, fragment removed, known tracking parameters stripped (page 4), so one page has one name

```typescript
// RFC 9309: 4xx = no rules; 5xx = full disallow (a cached copy may serve);
// cache ≤ 24 h; parse at least 500 KiB
async function robotsFor(host: string): Promise<Rules> {
  const hit = cache.get(host);
  if (hit && hit.until > Date.now()) return hit.rules;
  const r = await fetchWithTimeout(`https://${host}/robots.txt`, 10_000);
  let rules: Rules;
  if (r.status >= 500) rules = hit?.rules ?? DISALLOW_ALL;
  else if (r.status >= 400) rules = ALLOW_ALL;
  else rules = parseRobots((await r.text()).slice(0, 512 * 1024));
  cache.set(host, { rules, until: Date.now() + 86_400_000 });
  return rules;
}
```

- RFC 9309 (2022) is the rule set: unavailable, a 4xx, means the crawler may fetch anything; unreachable, a 5xx, means assume everything is disallowed; a cached copy should not be used past 24 hours unless the file is unreachable; the parser must read at least 500 KiB. The fetch runs once per host per day, and the rules are checked before a URL enters the frontier

### The failure

- Treating a 5xx on `robots.txt` as "allowed". The host is down or overloaded, its rules are unknown, and the standard says that is a complete disallow until it answers. The opposite reading crawls a struggling host hardest exactly when it cannot say no
