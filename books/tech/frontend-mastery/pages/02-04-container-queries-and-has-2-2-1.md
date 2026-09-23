## Container Queries and `:has()` - continued

```css
.card-slot {
  container-type: inline-size;    /* measure this element's width */
  container-name: card;
}

.card {
  display: block;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 1rem;
  }
}
```

The card now lays itself out based on the space it was given. Drop it in a sidebar and it stacks. Drop it in a wide column and it goes side by side. No prop, no parent involvement, no JavaScript.

`container-type: inline-size` measures width only, which is what you want almost always. `size` measures both dimensions but requires the container to have a fixed height, and `normal` allows only style queries.

**Container query units** go with it. `cqw` is one percent of the container's width, the way `vw` is one percent of the viewport's.

```css
.card h2 {
  font-size: clamp(1rem, 5cqw, 1.75rem);   /* scales with the slot, not the screen */
}
```

Tailwind exposes this as the `@` variants: `@container` on the parent, then `@sm:grid` and `@lg:grid-cols-2` on the children.
