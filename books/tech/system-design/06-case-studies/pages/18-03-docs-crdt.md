## CRDTs

- **Conflict-free Replicated Data Types (CRDTs):** An alternative to OT
- Instead of relying on numerical indexes (which shift), CRDTs assign a mathematically unique ID (like a fractional index) to every single character
- If Alice inserts 's' between ID 3.1 and 3.2, it gets ID 3.15. The exact position is immutable
- Operations commute by construction. It does not matter what order the server receives them. There is no transformation required
- **The Catch:** CRDTs carry a massive metadata overhead. A 10 KB text file might require 100 KB of hidden IDs and tombstones in memory

### The failure

- Choosing a CRDT for a highly centralized product just because it is a trendy buzzword. If you already have a central server, OT (or simpler Last-Writer-Wins) is often much more memory efficient.

:::interview
You decide to use a CRDT for collaborative editing. Users complain that after typing 10,000 words, the application consumes 2 GB of RAM and crashes. Why?

CRDTs assign complex metadata (unique IDs, tombstones for deleted characters) to every single character ever typed. Over time, the hidden metadata grows exponentially larger than the visible text, causing OOM errors.
:::\n