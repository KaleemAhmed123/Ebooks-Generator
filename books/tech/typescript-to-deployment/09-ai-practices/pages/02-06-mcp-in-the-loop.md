## Giving it tools

- A rules file is static text. **MCP servers let an agent ask questions and get current answers**, which is a different kind of context entirely
- Booklet 7 covered the protocol. This is where it earns its place day to day

| Server | Answers |
|---|---|
| **documentation** | what the current API of this library is, rather than the trained version |
| **database schema** | what the tables actually are, without pasting a dump |
| **issue tracker** | what this ticket says, and what was decided in the thread |
| **observability** | what this error looks like in production right now |
| **browser** | what the page does, for a frontend change |
| **internal service catalogue** | which service owns this, and who to ask |

### The two that pay for themselves immediately

- **A documentation server.** It removes the single most common failure, which is code written against a library version that no longer exists
- **A schema server.** It removes invented column names, which is the second most common

### The rules

- **Read-only by default.** A server that can query is useful; one that can write is a production incident waiting for a misread instruction
- **Scope the credentials to the developer**, not to a shared admin account. The agent acts with whatever authority you gave it
- **Fewer servers, better chosen.** Every connected server puts its tool definitions in the context window on every turn
- **Anything a server returns is untrusted text.** A poisoned issue description reaches the agent with the same authority as your instruction, which Module 6 covers
