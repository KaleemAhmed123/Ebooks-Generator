# Module 7 - Environments

## Why more than one

- An **environment** is a complete running copy of the system with its own data, its own configuration and its own address
- They exist so a change can be observed somewhere real **before the people paying you see it**

| Environment | Data | Who breaks when it breaks |
|---|---|---|
| **local** | disposable, seeded | you |
| **preview** | disposable, per branch | the reviewer |
| **staging** | production-shaped, never real customer data | the team |
| **production** | real | customers |

### The rule that makes them worth having

- **The same artifact runs in every one of them.** The image built from a commit is promoted, not rebuilt
- The moment staging runs a different build from production, staging stops being evidence and becomes a ritual
