### 3. Interaction to Next Paint (INP)
*(Note: INP officially replaced First Input Delay (FID) in March 2024)*.
**What it measures:** Responsiveness. When a user clicks a button, or opens an accordion, or types in a search bar, how long does it take for the UI to visually respond to that interaction?
**The Goal:** Less than **200 milliseconds**.
**How to fix a bad INP:**
- The primary cause of bad INP is the "Main Thread" being blocked. JavaScript is single-threaded. If a user clicks a button exactly while React is busy rendering a massive 500-row table, the click event is completely ignored until React finishes.
- You must break up long, synchronous JavaScript tasks. 
- You must aggressively Memoize your components to prevent unnecessary re-renders of massive component trees.
