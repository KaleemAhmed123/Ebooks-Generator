### The Modern Categorization
Today, Senior Frontend Engineers do not put everything in one bucket. We categorize state into four distinct buckets, and we use a specific, optimized tool for each one.

#### 1. Local UI State
- **What it is:** State that only matters to one specific component and its immediate children.
- **Examples:** A modal being open/closed. The current text inside a controlled input field. The active tab in a navigation bar.
- **The Tool:** `useState` or `useReducer`. 
- **Rule:** Never hoist this state higher in the component tree than it absolutely needs to go.

#### 2. Server State
- **What it is:** Data fetched from your backend API or database.
- **The Concept:** This is *not* your state. It is a cached snapshot of the database at the exact millisecond you fetched it. It can become "stale" at any moment if another user updates the database.
- **The Tool:** React Query (TanStack Query), Apollo Client, or React Server Components.
- **Rule:** Never put server data into `useState` or Redux.

#### 3. URL State
- **What it is:** State that a user might want to bookmark, share with a friend, or use the "Back" button to navigate.
- **Examples:** The current search query (`?q=shoes`), active filters (`?color=red`), pagination (`?page=2`), or the currently selected item ID.
- **The Tool:** React Router (`useSearchParams`) or Next.js App Router.
- **Rule:** The URL is the most powerful state manager in your app. Use it heavily.

#### 4. Global UI State
- **What it is:** State that truly belongs to the user's entire session and must be accessed by completely disconnected components across the app.
- **Examples:** The user's visual theme (Light/Dark mode), the current logged-in User Object, or an e-commerce Shopping Cart.
- **The Tool:** Zustand or React Context (if the value rarely changes).
- **Rule:** This should be your smallest bucket. If you have 50 variables in global state, your architecture is flawed.
