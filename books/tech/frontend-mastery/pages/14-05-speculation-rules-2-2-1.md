### Document rules, which is what you actually want

Listing URLs by hand does not scale. Document rules let the browser pick from
the links already on the page.

```html
<script type="speculationrules">
{
  "prerender": [{
    "where": {
      "and": [
        { "href_matches": "/*" },
        { "not": { "href_matches": "/logout" } },
        { "not": { "href_matches": "/admin/*" } },
        { "not": { "selector_matches": ".no-prerender" } },
        { "not": { "selector_matches": "[rel~=nofollow]" } }
      ]
    },
    "eagerness": "moderate"
  }]
}
</script>
```

The exclusions are not decoration. **Never prerender a link that does something.**
Prerendering `/logout` logs the user out while they are still reading the page.
The same goes for anything that adds to a cart, marks as read, or consumes a
single-use token.
