### 3. `@utility`, for a repeated pattern

When the same arbitrary value shows up in six places, promote it to a real utility. In v3 this meant `@layer utilities`, which had a subtle problem: those rules did not respond correctly to variants. v4 replaces it with `@utility`, and rules defined this way work with every modifier automatically.

```css
@utility hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}
```

```html
<div class="hide-scrollbar md:overflow-auto">...</div>
```

A utility can accept a value too. The `-*` suffix and the `--value()` function make it dynamic.

```css
@utility text-shadow-* {
  text-shadow: --value(--shadow- *);
}
```

### 4. `@custom-variant`, for a repeated selector

If you keep writing the same arbitrary variant, name it once.

```css
@custom-variant pointer-coarse (@media (pointer: coarse));
@custom-variant group-open (:merge(.group):is([open]) &);
```

```html
<button class="p-2 pointer-coarse:p-4">Bigger tap target on touch</button>
```

This is also how dark mode gets rewired when your app toggles a class instead of following the system.

```css
@custom-variant dark (&:where(.dark, .dark *));
```
