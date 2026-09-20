## Saving to the database

- The Multiplayer Server holds the document in RAM. But RAM is volatile. If the server crashes, all changes since the file was opened are permanently lost. How does Figma save to the database?

| Environment | Data Structure | Update Frequency |
|---|---|---|
| **RAM (Multiplayer Server)** | Active CRDT Tree. | 60 times per second (on every WebSocket event). |
| **Disk (Postgres DB)** | Action Log Tail + Checkpoint. | Every 5-10 seconds, in the background. |

- Figma does not update a Postgres row every time a user moves a mouse. Instead, the server accumulates actions in memory. Every few seconds, it performs a **Checkpoint**. It serializes the entire state of the tree, plus the "tail" of recent actions, and writes them to Postgres in a single, bulk transaction
- When the Multiplayer Server crashes, a new server boots up, pulls the last checkpoint from Postgres, and resumes. At worst, users lose a few seconds of recent mouse movements

### The failure

- Running an `UPDATE` on every keystroke. Even if you use WebSockets, if your backend server immediately forwards every single keystroke or mouse drag to a SQL database, you have accomplished nothing. The database will still crash. Real-time apps must aggregate writes in memory and flush them to disk asynchronously
