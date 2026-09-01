## Content Security Policy and Trusted Types

Escaping user input stops the XSS bugs you thought of. A **Content Security Policy** stops the ones you did not.

CSP is a response header that tells the browser which sources it is allowed to load and execute code from. Everything else is blocked, whatever the HTML says. It is defense in depth: it assumes an injection will eventually get through and limits what that injection can do.

### The header

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-r4nd0m';
  style-src 'self' 'nonce-r4nd0m';
  img-src 'self' data: https://cdn.example.com;
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self';
```

Read as a sentence: load everything from my own origin by default, run only scripts carrying this nonce, allow images from my origin plus this CDN, allow network calls only to my API, let nobody frame this page, no plugins, and no rewriting the base URL.

Four of those directives matter more than people expect:

- **`frame-ancestors 'none'`** is the modern replacement for `X-Frame-Options` and blocks clickjacking.
- **`object-src 'none'`** removes a legacy execution path that nothing modern needs.
- **`base-uri 'self'`** stops an injected `<base>` tag from redirecting every relative URL on the page.
- **`connect-src`** is the one that limits exfiltration. Even if a script runs, it cannot post your users' data to an attacker's server.
