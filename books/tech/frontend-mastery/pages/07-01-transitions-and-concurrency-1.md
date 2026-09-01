# Module 7: Concurrent React

## Transitions: Telling React What Can Wait

Before React 18, every state update was equally urgent. React started rendering, and nothing could stop it until it finished. If a keystroke triggered a re-render of a 5,000 row table, the browser froze until that table was done. The next keystroke sat in the queue, unpainted.

The insight behind concurrent React is that **not all updates matter equally**. When a user types into a search box, two things happen at once:

1. The letter must appear in the input. Instantly. Anything over 100ms feels broken.
2. The filtered results below must update. A 300ms delay here is invisible.

React had no way to tell those apart, so it treated both as urgent and both got slow.
