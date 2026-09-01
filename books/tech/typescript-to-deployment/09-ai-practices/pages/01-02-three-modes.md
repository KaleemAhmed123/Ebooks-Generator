## The three modes

- Every tool in this area is one of three shapes, and reaching for the wrong one is why a task feels harder than it should

| Mode | You are | Good for |
|---|---|---|
| **completion** | typing, it suggests | boilerplate, repetitive edits, the obvious next line |
| **chat** | asking, it answers | understanding, exploring, a snippet, a review |
| **agent** | delegating, it acts | a whole task across files, with tests and a diff |

### Completion

- Inline suggestions as you type. **The lowest risk and the lowest ceiling**
- Right for the fifth similar test case, a mapping function, a repetitive type
- **The failure mode is accepting quietly.** A wrong suggestion accepted by reflex is a bug nobody chose to write

### Chat

- A conversation with the repository in context. Explain this, why is this failing, what does this library do
- **The most underused mode.** Reading unfamiliar code is where the time actually goes, and this is very good at it

### Agent

- It plans, edits several files, runs commands, reads the output and iterates
- **The most useful and the most dangerous.** It can also delete a test, change an interface, or add a dependency you did not ask for
- Everything from Module 3 onward exists to make this mode safe

### Choosing

- **The rule: match the mode to how well you could review the result.** A change you could not review in ten minutes should not have been one agent request
- Splitting a large task into three agent runs you can each review is faster in wall-clock time than one you cannot
