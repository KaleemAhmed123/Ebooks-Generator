### HyDE, and why it works

- A question and an answer are written differently, so their embeddings sit apart even when they are about the same thing
- **HyDE** asks a model to draft a plausible answer, then embeds the draft. Answer-shaped text matches answer-shaped documents
- The draft can be entirely wrong and still retrieve correctly, because only its shape is being used

### The cost

- One extra fast call, usually 200 to 400 milliseconds, before the search
- **Skip it when the question is already specific.** A cheap classifier deciding whether rewriting is needed pays for itself
