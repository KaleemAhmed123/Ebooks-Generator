## Utilities, Variants, and Plugins

A design system enforces consistency. Reality is messy. A Figma file arrives with a banner that needs exactly `#1e293b` and a nudge of exactly `-17px`. Tailwind gives you four escape hatches, in increasing order of commitment.

### 1. Arbitrary values

Wrap any value in square brackets and the engine generates a one-off rule for it.

```html
<div class="bg-[#1e293b] text-[#89b4f8]">...</div>
<div class="top-[117px] -ml-[17px]">...</div>
<div class="grid-cols-[1fr_500px_2fr]">...</div>
<div class="h-[calc(100vh-var(--header-height))]">...</div>
```

If a value appears exactly once in the whole application, it belongs here, not in the theme. The theme is for tokens that repeat.

### 2. Arbitrary variants

The same brackets work on the selector side. This is how you style HTML you do not control: a Markdown renderer, a rich text editor, a third party widget.

```html
<div class="[&>p]:mt-4 [&>h1]:text-2xl [&_a]:underline">
  <h1>Title</h1>
  <p>Rendered from Markdown, no classes of its own.</p>
</div>
```

`&` is the element itself. `>` is a direct child, a space is any descendant.
