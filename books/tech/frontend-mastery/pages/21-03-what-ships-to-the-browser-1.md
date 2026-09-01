## What Ships to the Browser

Your bundle is not the only JavaScript on the page. Open a production site in
DevTools, sort the network tab by domain, and count the origins. Analytics, the
tag manager, the chat widget, the A/B testing tool, the session recorder, the
consent banner, the payment iframe, the error monitor.

Every one of those is a script from a company you do not control, running with
full access to your DOM, on a page where your users type passwords and card
numbers. Most of them were added by someone who is no longer on the team.

### The third-party script problem

A third-party `<script src>` is a standing invitation. The vendor can change
what that file contains at any time, on any deploy of theirs, without telling
you. Your review process never sees it. Your tests never run against it.

This is not hypothetical either. Card-skimming attacks have worked exactly this
way for a decade: compromise a widely embedded analytics or chat vendor, and
harvest checkout forms across every site that embeds them.

Three defenses, weakest to strongest.

### 1. Subresource integrity

Pin the content hash. If the bytes change, the browser refuses to execute them.

```html
<script src="https://cdn.example.com/widget.js"
        integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
        crossorigin="anonymous"></script>
```

Generate the hash yourself:

```bash
curl -s https://cdn.example.com/widget.js | openssl dgst -sha384 -binary | openssl base64 -A
```

SRI is real protection, and it only works for files that never change. A vendor
who ships continuously from a stable URL breaks the moment you pin them, which
is why most teams give up on it. That failure mode is the point: you want to
know when the file changed.
