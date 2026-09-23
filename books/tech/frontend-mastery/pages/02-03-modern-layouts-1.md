## Modern Layouts: Flexbox and Grid

For over a decade, frontend layouts were built on hacks. We used `float: left` intended for text-wrapping to build navigation bars, and `display: table` to vertically center elements. It was a nightmare.

Today, CSS provides two dedicated layout algorithms: **Flexbox** (for 1-Dimensional layouts) and **CSS Grid** (for 2-Dimensional layouts).

### Flexbox: The 1-Dimensional Engine

Flexbox is designed for laying out items in a single line, either a row or a column. Its primary superpower is **distribution of space**.

When you set `display: flex` on a container, the direct children become flex items. You no longer think about `width` and `height` in strict pixels; you think about how elements *flex* to fill available space.

#### The Flex Shorthand
The `flex` property on a child is a shorthand for `flex-grow`, `flex-shrink`, and `flex-basis`.

- `flex-basis`: The ideal, starting size of the element before space distribution happens. (Think of it as a better `width`).
- `flex-grow`: If there is extra space left over in the container, what proportion of that space should this element consume?
- `flex-shrink`: If the container is too small, what proportion of the overflow should be shaved off this element?

```css
/* The holy trinity of fluid layouts */
.sidebar { flex: 0 0 250px; } /* Do not grow, do not shrink, stay exactly 250px */
.content { flex: 1 1 auto; }  /* Grow to fill remaining space, shrink if necessary */
```

#### Alignment
Flexbox solved vertical centering forever.
- `justify-content`: Aligns items along the **Main Axis** (horizontal, if `flex-direction: row`).
- `align-items`: Aligns items along the **Cross Axis** (vertical, if `flex-direction: row`).
