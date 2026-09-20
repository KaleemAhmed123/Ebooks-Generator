## Offline and history

- **Offline edits:** If Alice loses internet, her local browser continues accepting her typing (Optimistic UI). It queues the operations locally
- When she reconnects, her client sends the queued operations to the server. The server (using OT) transforms her old operations against everything that happened while she was offline, and merges them in
- **History (Undo/Redo):** Undo is incredibly complex in multiplayer. If Alice deletes a word, Bob fixes a typo in that word, and Alice hits Undo, Alice's Undo must *not* wipe out Bob's typo fix. Undo does not mean "revert to previous state". It means "apply the inverse of my specific operation"

### The failure

- Implementing "Undo" by simply saving the entire document state every 10 seconds, and reloading the previous state on `Ctrl+Z`. This destroys the work of all concurrent collaborators.

:::interview
Alice and Bob are editing a document. Alice deletes Paragraph 1. Bob writes Paragraph 2. Alice hits Undo. What should the document look like?

It should contain both Paragraph 1 (restored by Alice) and Paragraph 2 (written by Bob). Multiplayer Undo applies the exact inverse of a specific user's action; it never rolls back the global document timeline.
:::\n