### The Zustand Store
Zustand fixes this by completely decoupling your state from the React component tree. You don't need to wrap your app in a `<Provider>`. The state lives outside of React.

```ts
import { create } from 'zustand';

// 1. Define your Types (if using TypeScript)
interface CartStore {
  items: string[];
  addItem: (item: string) => void;
  clearCart: () => void;
}

// 2. Create the Store
export const useCartStore = create<CartStore>((set) => ({
  items: [],
  
  // set() merges the new state with the old state automatically
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  
  clearCart: () => set({ items: [] })
}));
```
