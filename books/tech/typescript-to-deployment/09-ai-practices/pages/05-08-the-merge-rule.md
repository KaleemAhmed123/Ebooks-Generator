## The rule that holds everything together

- **You own every line you merge.** Not the tool, not the model, not whoever ran the agent
- When it breaks at 3am, the question is what this code does and why. **"The agent wrote it" is not an answer**, and the person who skipped reading it is the person now debugging it

### The test, stated plainly

- **Could you explain this change to a colleague, without the transcript?**
- **Could you have written it, given enough time?**
- **Do you know what it does when the input is empty, wrong, or hostile?**

- Three noes means do not merge. **One no means read it again**

### What to do when the answer is no

| Situation | Do |
|---|---|
| too large to hold | send it back to be split |
| you do not understand an approach | ask it to explain, then judge |
| you understand it and dislike it | send it back with the reason |
| it uses something unfamiliar | learn it, or reject it. Not neither |

- **"It uses something unfamiliar" is the one people get wrong.** Merging an unfamiliar library, pattern or API because it looks right is how a codebase acquires parts nobody can maintain

### Why this is not conservatism

- The value of these tools is speed, and **speed only compounds if the code stays maintainable**
- A codebase full of merged-but-unread code slows down within months, and the slowdown is permanent

### The one-line version

- **Generated is fine. Unread is not.**
