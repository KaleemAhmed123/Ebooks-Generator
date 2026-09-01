## Continued - continued

```tsx
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={buttonVariants({ variant, size, className })} {...props} />;
}
```

### The Conflict Problem: Tailwind Merge (`twMerge`)

In the `Button` component above, we pass an optional `className` prop so a consumer can add extra margins (e.g., `<Button className="mt-4" />`).

But what if the consumer wants to override the padding? `<Button className="px-8" />`
The resulting HTML will be: `class="px-4 py-2 px-8"`. 

Because of the CSS Cascade, the order of classes in the HTML attribute *does not matter*. The rule that wins is the one defined *last in the CSS file*. Since Tailwind generates CSS based on its internal rules, you have no guarantee that `px-8` will beat `px-4`.

We solve this using **`tailwind-merge`**.

`tailwind-merge` intelligently parses the string, understands Tailwind's utility groups, and automatically removes conflicting classes, ensuring the consumer's class always wins.

```tsx
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// The standard utility function used in almost every modern UI library (like shadcn/ui)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Now, we update our component:
```tsx
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
```
If `className` contains `px-8`, `tailwind-merge` strips `px-4` out of the final string. This is the cornerstone of building extensible Design Systems with Tailwind.
