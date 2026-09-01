### `:has()`, the parent selector

For twenty years CSS could only look down and forward. You could style a child based on its parent, never a parent based on its children. Anything else meant a class toggled by JavaScript.

`:has()` selects an element based on what it contains.

```css
/* A card that happens to contain an image gets a different layout */
.card:has(img) {
  grid-template-columns: 200px 1fr;
}

/* A form field whose input is invalid and has been touched */
.field:has(input:user-invalid) {
  border-color: var(--color-destructive);
}

/* A label that follows a checked checkbox */
label:has(+ input:checked) {
  font-weight: 600;
}

/* The whole page, when a dialog is open */
body:has(dialog[open]) {
  overflow: hidden;
}
```

That last one is worth pausing on. Locking background scroll when a modal opens used to require a `useEffect` that added a class to `document.body`, plus a cleanup that removed it, plus a bug when two modals overlapped. It is now one CSS rule with no state to get wrong.

`:has()` is not limited to children. It takes any relative selector, so `+` and `~` reach siblings.
