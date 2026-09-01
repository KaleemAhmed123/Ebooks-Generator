# Module 2 - Teaching it your codebase

## Why it does not know your repository

- A model was trained on public code. It has never seen your repository, your conventions, your deployment, or the decision you made last March
- An agent reads files as it works, and **it only reads what it thinks to look at**. Anything it does not open, it will guess at
- Guessing produces code that is idiomatic for the internet and wrong for your codebase: the wrong logger, the wrong error shape, a new utility beside your existing one

### The three things it consistently gets wrong without help

- **Conventions.** Which logger, which error class, which validation library, how routes are registered
- **Commands.** How to build, how to run one test, which package manager, whether there is a database to start first
- **Boundaries.** Which directories are generated, which are legacy and must not be touched, what must never change

### The fix, in order of value

| Fix | Effort |
|---|---|
| **a rules file at the repo root** | thirty minutes, once |
| **a repository shape it can navigate** | ongoing, and it helps humans too |
| **tools that answer questions** through MCP | a day, for a real payoff |
| **checks that catch the mistakes** | the highest value of all |

- **The last one is the important one.** A convention enforced by a lint rule is taught to every agent and every human automatically, forever
- **A rules file describes what a check cannot.** Prefer the check when both are possible
