## Keyboard Navigation and Focus Management

Many users with motor disabilities (or power users who just prefer it) navigate the web entirely using the `Tab` key on their keyboard. 

If your website is not navigable by a keyboard, it is fundamentally broken.

### The Focus Indicator
When you press `Tab`, the browser moves focus to the next interactive element (a link, a button, an input field) and draws an outline around it. 

Many designers hate this outline. It is a common, terrible practice to write this CSS:
```css
/* BAD: ILLEGAL: This destroys accessibility */
*:focus {
  outline: none;
}
```
If you remove the outline, a keyboard user has absolutely no idea where they are on the page. If the default blue outline clashes with your brand, you must replace it with a custom outline, not remove it.

```css
/* GOOD: The correct way to customize focus */
*:focus-visible {
  outline: 2px dashed #ff0000;
  outline-offset: 4px;
}
```
*(Note: Using `:focus-visible` ensures the outline ONLY shows up when the user is using a keyboard, preventing mouse users from seeing ugly rings when they click!).*
