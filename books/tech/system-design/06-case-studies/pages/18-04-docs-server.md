## One authority per document

- A document is highly stateful. You cannot route Alice's edit to Server A, and Bob's edit to Server B
- **Stateful Pinning (Figma):** When a document is opened, it is pinned to exactly one specific server process in the backend
- Alice and Bob both open WebSockets to that *exact same server*
- The server holds the entire document state in RAM. It receives operations, applies them, journals them to an append-only database (for durability), and broadcasts the result down the WebSockets
- If the server dies, the clients reconnect, a load balancer picks a new server, the new server loads the journal from the database, and resumes

### The failure

- Using standard stateless HTTP APIs behind a Round-Robin load balancer. Collaborative editing requires stateful, persistent WebSocket connections routed to a single authoritative process per document.

:::interview
Your collaborative editor is dropping edits. Logs show Alice's WebSocket connected to Pod 1, and Bob's WebSocket connected to Pod 2. Why is this a fatal architectural flaw?

Both pods are trying to act as the sequencer for the same document, creating diverging states. A specific document must be pinned to exactly one authoritative pod, and all editors must route to that pod.
:::\n