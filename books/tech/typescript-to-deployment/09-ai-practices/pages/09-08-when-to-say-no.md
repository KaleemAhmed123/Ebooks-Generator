## When not to use it

- **There are cases where the right answer is no**, and being able to say so is part of using it well

### Where the risk does not justify it

| Case | Why |
|---|---|
| **safety-critical code** | medical, automotive, aviation. The review standard is a different discipline |
| **cryptographic implementation** | subtly wrong crypto passes every test |
| **code you cannot review** | a language or domain nobody on the team knows |
| **a regulated environment with no policy** | ask first. "Nobody said no" is not approval |
| **anything under confidentiality you have not checked** | client code, third-party source |

### Where it is simply not worth it

- **A task smaller than the prompt.** Module 4 covers this, and it is the most common case
- **Design work.** It produces a plausible synthesis of common approaches, which is not a decision
- **Anything where you are the only source of the context.** Explaining it fully takes longer than doing it

### The one that needs saying

- **Do not use it to produce work you cannot evaluate.** Generating a system you do not understand, in a domain you do not know, is not an advantage. It is a liability with a deadline

### The line to hold

- **A person is accountable for every change, and that person has to understand it.** Everything else in this booklet is machinery for making that possible at higher volume
- **When the machinery cannot keep up, the answer is less volume**, not less understanding
