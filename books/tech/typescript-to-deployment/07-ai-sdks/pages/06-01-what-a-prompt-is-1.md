# Module 6 - Prompt and context engineering

## A prompt is an input, not a spell

- Prompting has a reputation for being folklore, and most of that reputation comes from people treating it as one
- What actually happens is mechanical: the request text conditions which tokens become likely next, and clearer text conditions more reliably
- **A prompt is program input.** It deserves version control, review, tests and a rollback path, exactly like a SQL query or a regular expression
- The techniques below are not tricks. Each removes a specific ambiguity the model would otherwise resolve by guessing
