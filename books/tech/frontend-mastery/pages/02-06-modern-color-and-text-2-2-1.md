### Text that wraps properly

Three one-line fixes for problems that used to need JavaScript.

**`text-wrap: balance`** evens out the lines of a short block so a heading never leaves one orphaned word on the last line. It is limited to a handful of lines by design, so use it on headings and captions, not paragraphs.

```css
h1, h2, h3, figcaption { text-wrap: balance; }
```

**`text-wrap: pretty`** targets long text instead. It costs slightly more to compute but prevents a single trailing word on the final line.

```css
p { text-wrap: pretty; }
```

**Line clamping** is now a plain declaration instead of the old four-property `-webkit-box` incantation.

```css
.excerpt {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```

### `clamp()` for type that scales

A font size that responds to the viewport without a single media query.

```css
h1 {
  font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3.5rem);
  /*         minimum,  preferred,          maximum */
}
```

Keep a `rem` term in the middle expression. A purely `vw` value stops responding when the user changes their browser's font size, which breaks zoom for anyone who needs it.
