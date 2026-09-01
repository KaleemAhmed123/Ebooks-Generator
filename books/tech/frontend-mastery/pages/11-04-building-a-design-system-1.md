## Building a Design System with Tailwind

When you start mixing Tailwind CSS with component-based frameworks like React, the architecture changes. You no longer need to write CSS, but you must aggressively manage the string concatenation of your class names to avoid bloated, unreadable code.

Building a Design System means creating atomic components (Buttons, Inputs, Cards) that are strictly typed, highly variant, and visually consistent.

### The Anti-Pattern: `@apply`

When developers first learn Tailwind, they see a long string of classes on a button and panic. Their instinct is to hide the classes in a CSS file using Tailwind's `@apply` directive.

```css
/* BAD: Do not do this. You are just writing semantic CSS again. */
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600;
}
```
By doing this, you have abandoned the primary benefits of Tailwind. You are back to inventing class names, context switching between files, and appending dead CSS.

**The Solution: React Components.** Instead of hiding the classes in a CSS file, hide them in a React file.

```tsx
// GOOD: The component encapsulates the design
export function Button({ children }) {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600">
      {children}
    </button>
  );
}
```
