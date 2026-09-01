### The syntax

A JSON script tag in the document, or a `Speculation-Rules` response header.

```html
<script type="speculationrules">
{
  "prerender": [{
    "urls": ["/checkout", "/cart"]
  }],
  "prefetch": [{
    "urls": ["/search"]
  }]
}
</script>
```

**Prefetch** downloads the document. Cheap, saves the network round trip.
**Prerender** downloads it, runs its scripts, and renders it. Expensive, and the
result is a navigation with no visible load at all.
