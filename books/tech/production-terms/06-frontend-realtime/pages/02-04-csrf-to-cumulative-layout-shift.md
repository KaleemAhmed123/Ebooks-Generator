## CSRF

*cross-site request forgery*

A malicious page causing the browser to send an authenticated request to your
site, using cookies the browser attaches automatically.

A hidden form on another site POSTs to your transfer endpoint. The browser
attaches the session cookie because that is what browsers do, and the transfer
succeeds.

Three defences, and the first is nearly free: `SameSite=Lax` or `Strict` on the
session cookie, a CSRF token on state-changing requests, and checking the
`Origin` header.

**A bearer token in an `Authorization` header is not vulnerable to this**,
because nothing attaches it automatically. That is a real security difference
between cookie sessions and token auth, and it is often the deciding one.

## Cumulative Layout Shift

*CLS*

Content jumping as late resources arrive. It is why you tap the wrong button on
a news site.

An image with no width and height reserves no space. When it loads, everything
below it moves 300 pixels — frequently just as someone is reaching for a link.

The causes are always the same short list: images without dimensions, ads and
embeds injected into flow, web fonts swapping at a different size, and content
inserted above what is already rendered.

**Reserve the space before you have the content.** Width and height attributes,
`aspect-ratio`, and a fixed-height container for anything arriving later. A
placeholder that is the wrong size is still better than no placeholder.
