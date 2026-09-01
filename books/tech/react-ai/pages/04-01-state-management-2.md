### Zustand: a global store without the ceremony

```tsx
import { create } from 'zustand'

interface UIStore {
  sidebarOpen: boolean
  activeTab: string
  setSidebarOpen: (open: boolean) => void
  setActiveTab: (tab: string) => void
}

const useUIStore = create<UIStore>()(set => ({
  sidebarOpen: true,
  activeTab: 'orders',
  setSidebarOpen: open => set({ sidebarOpen: open }),
  setActiveTab: tab => set({ activeTab: tab }),
}))

// Component only re-renders when sidebarOpen changes
function Sidebar() {
  const sidebarOpen = useUIStore(s => s.sidebarOpen)
  return sidebarOpen ? <nav>...</nav> : null
}
```

- The selector on the last line is what prevents unnecessary re-renders
- Without a selector, every state change in the store re-renders every subscriber
- Every `useUIStore` call should have a selector. Calling `useUIStore()` with no selector subscribes to everything
