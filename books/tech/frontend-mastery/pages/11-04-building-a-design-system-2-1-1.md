### Class Variance Authority (CVA)

A real Design System button is never just one thing. It has variants (primary, secondary, destructive), sizes (sm, md, lg), and states (disabled, loading).

Managing these combinations with standard ternary operators becomes an unreadable nightmare:

```tsx
// TERRIBLE: String interpolation hell
<button className={`px-4 py-2 rounded ${variant === 'primary' ? 'bg-blue-500' : 'bg-gray-200'} ${size === 'lg' ? 'text-lg' : 'text-sm'}`}>
```

Enter **CVA (Class Variance Authority)**. CVA is a tiny library that allows you to define complex variant matrices declaratively.

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
```
