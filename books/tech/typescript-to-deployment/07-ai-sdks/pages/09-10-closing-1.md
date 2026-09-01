## The twelve things worth remembering

### 1. The model is a stateless HTTP call

- Memory, history and retrieval are your storage. Nothing persists on the other side

### 2. Read the stop reason before the text

- `max_tokens` and `refusal` both produce output that parses as a bug somewhere else

### 3. Structured output instead of asking for JSON

- A schema turns a text generator into a typed function, and removes a whole class of failure

### 4. The tool is the security boundary, never the prompt

- The tenant comes from the session. No prompt survives an attacker who can write into the context

### 5. Cache the fixed prefix

- Static first, dynamic last, byte for byte identical. It is the largest saving available for one line

### 6. Every agent needs four budgets

- Steps, tokens, wall clock, and calls per tool. An agent without them is unbounded spend

### 7. Print the retrieved chunks before blaming the model

- Most retrieval failures are chunking failures, and no prompt fixes them

### 8. Hybrid search, then rerank

- Wide and cheap first, narrow and expensive second. It is the standard shape because it works

### 9. Approval gates on anything irreversible

- Show the arguments, record the approver, and let the run survive the wait

### 10. A production agent is a job, not a request

- Persist after every step, make every tool idempotent, stream progress from the record
