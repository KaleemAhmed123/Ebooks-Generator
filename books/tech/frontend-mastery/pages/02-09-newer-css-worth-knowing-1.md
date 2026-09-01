## Newer CSS Worth Knowing

Everything in this module so far is widely supported and safe. This page is the
edge: features that shipped recently, roughly in the order you are likely to
need them.

Two numbers to calibrate against, both measured in the State of CSS 2026 survey:
**`:has()` is used by 83.7% of developers** and is simultaneously the most used
and the most loved feature in the survey. **`aspect-ratio` is at 81.3%.** If you
are not using those two, you are behind the median, not ahead of it.

### CSS Nesting, at 70.6% usage

Nesting is native now. No preprocessor, no build step.

```css
.card {
  padding: 1rem;
  border-radius: var(--radius-lg);

  & h3 {
    font-size: var(--text-xl);
  }

  &:hover {
    border-color: var(--color-primary);
  }

  @media (width >= 40rem) {
    padding: 2rem;
  }
}
```

Two differences from Sass. The `&` is required when the nested selector starts
with an element name, otherwise the parser cannot tell a nested rule from a
declaration. And **`&` cannot be concatenated**: Sass's `&__title` producing
`.card__title` has no native equivalent, deliberately, because it makes class
names ungreppable.

Note the media query syntax too. `@media (width >= 40rem)` reads as arithmetic
rather than as `min-width`, and is supported everywhere nesting is.
