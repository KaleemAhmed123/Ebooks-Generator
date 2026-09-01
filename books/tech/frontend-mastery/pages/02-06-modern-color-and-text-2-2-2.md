### Cascade layers

`@layer` gives the cascade an explicit order, so a low-specificity rule in a later layer beats a high-specificity rule in an earlier one. This is how you stop fighting a third party stylesheet with `!important`.

```css
@layer reset, vendor, base, components, utilities;

@layer vendor {
  .datepicker__cell { color: #333; }   /* high specificity, low priority */
}

@layer utilities {
  .text-ink { color: var(--color-ink); }   /* low specificity, wins anyway */
}
```

Layer order is declared once, at the top, and beats specificity entirely. Anything outside a layer wins over everything in one, which is a useful escape hatch and an easy accident.
