### `@starting-style`

Animate an element in from the moment it first appears, including from
`display: none`. Before this, entry animations needed a JavaScript frame delay
to give the browser a starting value to animate from.

```css
.toast {
  opacity: 1;
  transition: opacity 0.3s, display 0.3s allow-discrete;
}

@starting-style {
  .toast { opacity: 0; }
}
```

`allow-discrete` on the transition is what lets `display` participate, so the
element stays rendered for the duration of the fade instead of vanishing on
frame one.

### How to decide whether to use any of these

Look the feature up on MDN and read the **Baseline** badge, which is a single
honest answer instead of a support table you have to interpret:

- **Baseline Widely available**: shipped in every engine over 30 months ago. Use
  it without thinking.
- **Baseline Newly available**: in every engine, but recently. Fine if your
  analytics show your users are current, and fine anywhere as progressive
  enhancement.
- **Limited availability**: progressive enhancement only, or wait.

The `@supports` rule handles the middle case honestly.

```css
@supports (field-sizing: content) {
  textarea { field-sizing: content; }
}
```
