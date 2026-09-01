## Modern Color and Text

### Why `oklch` replaced hex

A hex code is a hardware instruction. `#3b82f6` means "set the red channel to 59, green to 130, blue to 246." It says nothing about how the color looks, and two hex codes with the same math can look wildly different in brightness to a human eye.

That causes a specific, familiar failure. You build a palette by picking `#3b82f6` and then guessing at lighter and darker versions. The 400 shade looks fine. The 600 looks muddy. You nudge values until it passes, and nobody can explain the rule.

`oklch()` describes color the way perception works: **lightness, chroma, hue.**

```css
color: oklch(0.62 0.19 259);
/*          |    |    |
            |    |    hue angle, 0 to 360
            |    chroma, how saturated
            lightness, 0 to 1, perceptually even */
```

Because lightness is perceptually uniform, `oklch(0.62 ...)` looks equally bright at every hue. Yellow at 0.62 and blue at 0.62 read as the same weight, which is not remotely true in HSL. A palette becomes a formula rather than a hunt.

```css
@theme {
  --color-brand-100: oklch(0.95 0.03 259);
  --color-brand-500: oklch(0.62 0.19 259);   /* same hue, stepped lightness */
  --color-brand-900: oklch(0.35 0.13 259);
}
```

It also reaches colors that hex cannot express. Hex is capped at sRGB. `oklch` can specify P3 colors, which modern phones and laptops actually display, so a brand color stays vivid instead of being flattened.
