### JavaScript plugins

The plugin ecosystem still works. Load a plugin from CSS with `@plugin` rather than from a config file.

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@plugin "@tailwindcss/forms";
```

Write your own only when the pattern genuinely needs JavaScript, for example generating a hundred classes from a data file. Anything expressible in CSS should be `@utility`, which is faster to compile and readable by anyone who knows CSS.

### One syntax change that will bite you

The important modifier moved from the front of the class to the back.

```html
<!-- v3 -->
<div class="!flex !bg-red-500">

<!-- v4 -->
<div class="flex! bg-red-500!">
```

### Choosing between the four

| Situation | Reach for |
|---|---|
| Used once, ever | arbitrary value |
| Styling markup you do not own | arbitrary variant |
| Same declaration in five or more places | `@utility` |
| Same selector condition repeatedly | `@custom-variant` |
| Needs to read data or loop | a JavaScript plugin |
