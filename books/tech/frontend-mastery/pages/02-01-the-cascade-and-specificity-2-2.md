### The Modern Solution: Cascade Layers (`@layer`)

A recent addition to CSS is Cascade Layers. `@layer` allows you to define explicit buckets of priority, overriding specificity entirely.

```css
@layer reset, framework, custom;

@layer framework {
  .card.special-card { background: blue; } /* High specificity */
}

@layer custom {
  .card { background: red; } /* Low specificity */
}
```

Because `custom` was defined *after* `framework` in the layer declaration order, the `.card` rule in the `custom` layer wins, even though it has lower specificity. This is how you override third-party library styles without entering a specificity war.
