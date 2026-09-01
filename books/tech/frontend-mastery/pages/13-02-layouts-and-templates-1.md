## Layouts and Templates

In the Next.js App Router, the file system dictates the routing, but it also dictates the UI hierarchy through special files like `layout.tsx` and `template.tsx`.

### The `layout.tsx` File
A Layout is a UI component that is shared between multiple pages. On navigation, layouts preserve their state, remain interactive, and do not re-render.

If you create an `app/dashboard/layout.tsx` file, it will automatically wrap every single `page.tsx` file inside the `dashboard/` directory (e.g., `/dashboard/settings`, `/dashboard/analytics`).

```tsx
// app/dashboard/layout.tsx
import { Sidebar } from './Sidebar';

// A layout MUST accept a `children` prop
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      {/* This is where the specific page.tsx content will be injected */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
```

**The Superpower:** Because layouts do not re-render on navigation, if a user clicks a link in the `<Sidebar />` to go from `/dashboard` to `/dashboard/settings`, the Sidebar stays perfectly frozen in place. Any React state (like a collapsed menu) is preserved. Only the `<main>` content swaps out.
