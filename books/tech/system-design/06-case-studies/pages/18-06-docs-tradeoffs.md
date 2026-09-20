## What the interviewer probes

- **Cursor presence:** How do you show Bob's mouse pointer on Alice's screen? Broadcast ephemeral `(x, y)` coordinates via the WebSocket. Never save cursor movements to the database
- **Large documents:** If a document is 500 pages, the server RAM will choke. You must split the document into pages or sections. Only load the section the user is actively viewing into the stateful server process
- **Permissions:** Can a user be demoted from 'Editor' to 'Viewer' while they are actively typing? Yes. The server receives their operation, checks the auth token, rejects it, and forces their client to reload as read-only

### The failure

- Writing cursor movements `(x=100, y=200)` to the Postgres database. This will generate thousands of writes per second per user, instantly destroying the database.

:::interview
Your database is experiencing 100,000 writes per second and collapsing. You discover it is storing the X/Y coordinates of every user's mouse pointer. How do you fix this?

Mouse pointers and presence data are ephemeral. They should be broadcast directly between clients via WebSockets (or through a pub/sub layer like Redis) and never written to persistent disk storage.
:::\n