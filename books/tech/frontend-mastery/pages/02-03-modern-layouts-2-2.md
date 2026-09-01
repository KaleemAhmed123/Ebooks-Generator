## Continued - continued

#### CSS Subgrid
Historically, a Grid's tracks only applied to its direct children. If you had a nested component, it couldn't align itself to the parent's grid lines. 
`grid-template-columns: subgrid` solves this. It tells a nested element to adopt the tracks defined by its parent grid, allowing deep components to align perfectly with the page-level layout.

### Flexbox vs. Grid: Which to use?
- Use **Grid** when you are defining the macro-layout of a page or component, and you need elements lined up in both rows and columns simultaneously.
- Use **Flexbox** when you are defining micro-layouts (like aligning an icon next to text in a button, or a row of navigation links). 
They are designed to be used together. A Grid item can easily be a Flex container.

### `aspect-ratio`

Used by 81.3% of developers in the State of CSS 2026 survey, which makes it one
of the most adopted CSS features there is, and it replaces a hack that was
standard for fifteen years.

```css
.video   { aspect-ratio: 16 / 9; }
.avatar  { aspect-ratio: 1; width: 48px; }
.card-image { aspect-ratio: 4 / 3; object-fit: cover; }
```

The old approach was a wrapper with `padding-top: 56.25%` and an absolutely
positioned child, because percentage padding resolves against the parent's
*width*. That worked, was impossible to read, and broke the moment anything
inside needed normal flow.

The reason it matters beyond tidiness: `aspect-ratio` reserves the space before
the image or iframe loads, so nothing shifts when it arrives. That is a
Cumulative Layout Shift you never have to debug.
