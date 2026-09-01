### Trusted Types

CSP controls where code comes from. **Trusted Types** control how code gets into the DOM.

Roughly every DOM XSS bug is one of a small set of assignments: `innerHTML`, `outerHTML`, `document.write`, `eval`, a `javascript:` URL, `setAttribute('src', ...)` on a script. Trusted Types make those sinks reject plain strings at the browser level. They accept only an object produced by a policy you wrote.

```
Content-Security-Policy: require-trusted-types-for 'script'; trusted-types default sanitizer;
```

```js
const policy = trustedTypes.createPolicy('sanitizer', {
  createHTML: (input) => DOMPurify.sanitize(input),
});

element.innerHTML = policy.createHTML(userContent);   // allowed
element.innerHTML = userContent;                       // TypeError, blocked
```

The value is that it is enforced by the browser rather than by code review. A new contributor writing `innerHTML = value` gets a runtime error instead of a merged pull request. Turn it on in report-only mode first, the same way.

### Subresource Integrity

If you do load a script from a CDN, pin its content hash. If the CDN is compromised and serves different bytes, the browser refuses to execute them.

```html
<script src="https://cdn.example.com/lib.js"
        integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
        crossorigin="anonymous"></script>
```

The stronger move is not to load third party scripts from third party origins at all. Self-host them, and a supply chain compromise cannot reach your users between deploys.
