## When NOT to use Tailwind: CSS Modules and Vanilla Extract

Tailwind CSS is the dominant styling solution in the React ecosystem today, but it is not a silver bullet. There are specific scenarios where Tailwind falls short, and understanding alternative architectures is critical for a senior engineer.

### The Limits of Tailwind

1. **Massive Dynamic Values**: If you are building a charting library or a drag-and-drop canvas where elements have their `x` and `y` coordinates calculated in real-time by React state, Tailwind cannot help you. (Remember: the Tailwind scanner matches static strings, it does not execute your JavaScript).
2. **Highly Complex Math**: If your CSS relies on deep `calc()` functions referencing multiple CSS custom properties simultaneously, trying to write that in an Arbitrary Value `w-[calc(var(--a)*var(--b)/100)]` becomes unreadable.
3. **White-Labeling at Scale**: While Tailwind supports custom themes, if you are building an application where the end-user can define their own exact hex colors via a dashboard, you will have to fall back to CSS Custom Properties anyway.
