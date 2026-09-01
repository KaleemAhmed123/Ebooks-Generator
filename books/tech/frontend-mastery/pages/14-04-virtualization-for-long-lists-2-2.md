## Continued - continued

The naive version is thirty lines and wrong in six ways: variable row heights,
resizing, keyboard navigation into an unrendered row, screen readers announcing
the wrong item count, sticky headers, and scroll anchoring when items load
above.

| Library | Use it for |
|---|---|
| **TanStack Virtual** | the default. Headless, framework-agnostic, handles variable and dynamic sizes |
| **react-virtuoso** | when you want grouping, sticky headers and infinite loading already built |
| **react-window** | small and stable, fixed sizes, when your rows are uniform |

TanStack Virtual is headless in the same sense as TanStack Query: it computes
which items should be visible and where, and you render them. That means it
works with your existing markup rather than replacing it, which matters for the
accessibility attributes below.

### The accessibility part people skip

A virtualized list lies to assistive technology. The DOM says there are twelve
rows. There are forty thousand.

```jsx
<div role="grid" aria-rowcount={40000}>
  {virtualRows.map((v) => (
    <div role="row" aria-rowindex={v.index + 1} key={v.key}>
      ...
    </div>
  ))}
</div>
```

`aria-rowcount` on the container and `aria-rowindex` on each row tell the truth
about the real list, so a screen reader announces "row 12,043 of 40,000" instead
of "row 3 of 12".
