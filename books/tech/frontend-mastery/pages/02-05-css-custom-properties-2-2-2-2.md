### Dynamic JavaScript Interaction

The true superpower of Custom Properties is how easily they bridge the gap between JavaScript state and CSS presentation.

Instead of writing inline styles via React (`<div style={{ transform: \`translateX(${x}px)\` }}>`), which causes massive performance issues by inline-rendering every frame, you update a Custom Property.

```javascript
// On mouse move, update the variables on the root document
document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
```

```css
/* The CSS handles the rendering entirely on its own */
.glow-effect {
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y), 
    rgba(255,255,255,0.1),
    transparent 40%
  );
}
```

### Theming and Design Systems

Custom Properties are the backbone of modern Design Systems. Tailwind CSS, for example, is entirely built on top of them. When you use Tailwind's `text-blue-500` class, you are reaching through a chain of CSS variables under the hood to handle opacity and color channels.

When building a white-label application (an app that can be rebranded for different clients), Custom Properties allow you to fetch a JSON file of colors from the server, inject them into the `:root` via JavaScript, and re-theme the entire application instantly without recompiling a single line of CSS.
