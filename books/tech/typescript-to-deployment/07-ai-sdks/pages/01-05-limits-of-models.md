## Four things a model cannot do

- Most production incidents in this area come from expecting one of these four, so they are worth stating before any code

### 1. It cannot remember

- Every request starts from nothing. Continuity is the message array you resend, and nothing else
- **Memory is a database problem wearing an AI costume.** Module 8 covers the shapes it takes

### 2. It cannot know anything recent

- Training stopped on a date. Anything after that, and anything private, is unknown unless you put it in the request
- That is the entire reason retrieval exists, covered in Module 7

### 3. It cannot be trusted to be right

- A **hallucination** is a confident, well-formed, wrong answer. It looks exactly like a correct one
- There is no confidence score to threshold on. Grounding, citations and verification are your job

### 4. It cannot do anything by itself

- It returns text. It cannot call your database, send an email or charge a card
- Tool calling, in Modules 2 and 3, is the model **asking your code** to do something. Your code decides whether to

### What follows from this

- Treat the model as an untrusted, occasionally wrong, third-party service that charges per byte
- Every pattern from Booklet 6 applies: timeouts, retries, validation at the boundary, and never trusting the payload
