### The Alternative: CSS Modules

If you decide not to use Tailwind, you absolutely must not write global CSS. Global CSS leads to class name collisions.

The standard, bundler-native solution is **CSS Modules**.

When you write a file named `Button.module.css`:
```css
.button {
  padding: 1rem;
  background: blue;
}
```
And import it into React:
```tsx
import styles from './Button.module.css';

export function Button() {
  return <button className={styles.button}>Click Me</button>;
}
```

Behind the scenes, your bundler (Webpack, Vite, Turbopack) transforms the class name into a globally unique hash, like `.Button_button__3x9d`. 

This guarantees **zero global collisions**, allowing you to write standard, semantic CSS with confidence.
