### Selectors (The Performance Secret)

To use the store in a component, you don't just grab the whole store. You use a **Selector** to subscribe to the exact, specific piece of state you care about.

```tsx
function CartCounter() {
  // We ONLY select the length of the items array.
  // This component will ONLY re-render if the length changes.
  const itemCount = useCartStore((state) => state.items.length);

  return <span>Items in cart: {itemCount}</span>;
}

function AddToCartButton() {
  // We ONLY select the addItem function.
  // This component will NEVER re-render when the cart items change.
  const addItem = useCartStore((state) => state.addItem);

  return <button onClick={() => addItem("Laptop")}>Add Laptop</button>;
}
```
Zustand keeps re-renders scoped to the components that read the changed slice, while giving you the exact same global data access as Redux.
