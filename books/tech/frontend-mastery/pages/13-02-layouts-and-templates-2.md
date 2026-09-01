### The `template.tsx` File
Templates are almost identical to Layouts, with one difference that matters: **Templates DO re-render on navigation.** 
When a user navigates between routes that share a template, a brand new instance of the template is mounted, DOM elements are recreated, and state is destroyed.

You rarely need `template.tsx`. You should default to `layout.tsx` 99% of the time. 
However, templates are useful in very specific scenarios:
1. **Entrance Animations:** If you want an animation (like a fade-in using Framer Motion) to trigger every single time the user clicks a link, a layout won't work because it doesn't unmount. A template forces the animation to replay.
2. **Resetting State:** If you have a highly complex form wizard, and you explicitly *want* the state to be destroyed and reset when the user navigates between steps.

### The Root Layout
Every Next.js App Router must have one special file at the very top: `app/layout.tsx`.
This is the Root Layout. It is the only file in the entire application where you are required to define the `<html>` and `<body>` tags. 

```tsx
// app/layout.tsx
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```
If you need to add Google Analytics, global CSS, or a global Auth Provider, it goes here.
