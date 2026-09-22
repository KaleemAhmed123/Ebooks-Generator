# Module 18 - Collaborative editing

## Requirements and numbers

- Collaborative editing lets many people change one document at once and shows every one of them the same document afterwards. The shape: the hard problem is inside one document, where concurrent edits to the same text must converge, and the scale problem, millions of documents, is trivially independent
- Functional, in: edits from many clients merged into one document; every client sees others' edits within a second; edits made offline merge on reconnect; history and undo. Out: rendering rich text, comments and permissions models (page 6), search
- Non-functional: convergence, every client ends with the same document whatever the order edits arrived; sub-second propagation, one hop up and one down; no edit lost on a crash
- Inputs, as assumptions: 1 M documents open at any time; up to 100 concurrent editors on a busy document, hundreds at most, never millions; an editor types 5 characters a second; an operation of 50 bytes

| Quantity | Arithmetic | Result |
| :--- | :--- | :--- |
| ops into one busy doc | 100 editors × 5/s | 500 ops/s, through one sequencer for that document (page 4) |
| fan-out from it | 500 ops/s × 99 other editors | ≈ 50 000 messages/s on one document's server: the busy document's real load |
| journal | 500 × 50 B | 25 KB/s per busy document; a day of continuous editing is ≈ 2 GB, which is why there are snapshots (page 5) |
| across documents | 1 M documents, independent | sharded by document id with nothing shared between them; a document is the unit of placement (page 4) |

- The numbers say one server can own a document and its fan-out (page 4), and that the design is decided by the merge algorithm, OT with a sequencer (page 2) or CRDTs without one (page 3), and by what offline and undo mean under it (page 5)

### The failure

- Designing for scale across documents when the hard part is inside one. A sharded fleet and a cache tier for "a million editors" answer a question nobody asked; two people inserting into the same sentence at the same moment is the question, and the infrastructure has no answer to it
