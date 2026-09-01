### Automatic content detection

v3 required a `content` array listing every glob to scan. Forget a path and half your classes silently vanished from production.

v4 finds the files itself. It starts at the project root, respects `.gitignore`, and skips binaries and anything in `node_modules`. The `content` array is gone.

When a template lives somewhere Tailwind cannot guess, such as inside a package you depend on, point at it explicitly:

```css
@import "tailwindcss";
@source "../../packages/ui/src";
```

### The scanner is deliberately naive

Tailwind never executes your JavaScript. It reads the raw text of the file and matches strings against its patterns. That single fact explains the most common Tailwind bug there is.

```jsx
// BROKEN. Tailwind sees the literal text `bg-${color}-500` and nothing else.
const color = isError ? 'red' : 'green';
return <div className={`bg-${color}-500`} />;
```

The class never gets generated, so the element has no background at all.

```jsx
// WORKS. Both complete strings exist in the source text.
const bg = isError ? 'bg-red-500' : 'bg-green-500';
return <div className={bg} />;
```

The rule: **every class name must appear somewhere in your source as a complete, unbroken string.**

If a value genuinely only exists at runtime, for example a color that comes back from an API, safelist it in CSS:

```css
@source inline("bg-red-500 bg-green-500 bg-amber-500");
```
