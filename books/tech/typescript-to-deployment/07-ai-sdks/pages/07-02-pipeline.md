## The pipeline, and where it goes wrong

- Retrieval is six steps. Five of them are ordinary backend work, and the sixth is the model call
- Knowing which step a bad answer came from is the whole skill, because the fix is different at every step

| Step | Runs | Fails as |
|---|---|---|
| 1. load and parse | indexing | text missing, tables mangled |
| 2. chunk | indexing | an answer split across two chunks |
| 3. embed | indexing | wrong model, or model changed |
| 4. store and index | indexing | index stale, filters missing |
| 5. retrieve | request | right document, wrong rank |
| 6. generate | request | good context, ignored |

### The diagnosis that saves days

- When an answer is wrong, **print the retrieved chunks before blaming the model**
- If the answer was not in them, the problem is steps 1 to 5 and no amount of prompting fixes it
- If it was in them and the answer is still wrong, the problem is the prompt or the model
- Most teams spend weeks on step 6 for a problem that lives in step 2

### Two jobs, not one

- **Indexing is a background job.** It is slow, it is batched, and it runs on a queue as Booklet 5 describes
- **Retrieval is on the request path.** It has to answer in tens of milliseconds
- Keeping them separate is what stops a document upload from blocking a chat request
- Re-indexing must be re-runnable from the source documents. Treat the vector store as a derived copy, never as the source of truth
