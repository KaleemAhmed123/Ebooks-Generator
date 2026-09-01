### The isolation cuts both ways

Shadow DOM's guarantee is also its main cost. Your global stylesheet does not
reach inside. Neither does Tailwind. A design system built on utility classes
does not work through a shadow boundary without extra work.

The way through is CSS custom properties, which **do** cross the boundary:

```css
/* outside */
user-card { --card-bg: var(--color-surface); --card-radius: 12px; }
```

```css
/* inside the shadow root */
:host { background: var(--card-bg, white); border-radius: var(--card-radius, 8px); }
```

`::part()` is the other door, for exposing specific inner elements to outside
styling on purpose:

```js
shadow.innerHTML = `<button part="trigger">Open</button>`;
```

```css
user-card::part(trigger) { font-weight: 600; }
```

That is deliberate API design: you choose what is styleable, the same way you
choose what props to accept.
