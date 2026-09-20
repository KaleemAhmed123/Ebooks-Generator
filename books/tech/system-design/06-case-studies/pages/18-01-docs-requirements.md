# Collaborative Editing

### Requirements and numbers

- Collaborative editing (Google Docs, Figma) allows multiple users to edit the same document concurrently
- **In scope:** Sub-second propagation, offline edit merging, document history
- **Out of scope:** The rich-text rendering engine in the browser

| Metric | Requirement |
|---|---|
| **Concurrency** | Hundreds of writers per document (not millions) |
| **Latency** | Sub-second sync. Must feel real-time |
| **Consistency** | Strong eventual consistency. All clients must converge |

- **The core constraint:** Users type on their local browser (optimistic UI) and send the edits to the server. Because of network latency, Alice and Bob might edit the exact same paragraph at the exact same millisecond. The system must mathematically resolve the conflict so both screens show the exact same final text

### The failure

- Designing the system to support 1 million concurrent editors on a single document. That is a broadcast architecture problem (like Twitch chat). A collaborative document rarely has more than 50 active editors.

:::interview
An interviewer asks you to design Google Docs. You start architecting a massive Cassandra cluster to handle 1 million users editing a document simultaneously. Why are you failing?

Because 1 million people do not type on a single A4 page simultaneously. The hard part of Google Docs is resolving edit conflicts between 5 people, not scaling to millions of writers on one doc.
:::\n