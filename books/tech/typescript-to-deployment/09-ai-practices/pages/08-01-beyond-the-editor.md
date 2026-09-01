# Module 8 - Agents in the workflow

## Outside the editor

- Everything so far assumed you and one agent, in one repository, in one session. **That is one shape, and it is no longer the only one**
- The shapes that matter in a real workflow, in rough order of how commonly teams adopt them:

| Shape | Is |
|---|---|
| **interactive** | you and an agent, one task, watching |
| **parallel worktrees** | several agents, several branches, one machine |
| **background** | a long task running while you do something else |
| **subagents** | one agent delegating pieces to others |
| **triggered** | an issue or a comment starts a run, and a pull request appears |
| **review** | an agent comments on every pull request |

### The constraint that governs all of them

- **Everything an agent produces has to be reviewed by a person.** Parallelism multiplies output, and review capacity does not multiply with it
- Reported experience is consistent: **four to eight concurrent worktrees per developer is where most people land, and above that the bottleneck is review, not the tool**
- **Running more agents than you can review is not productivity.** It is a queue of unread branches

### The rule for this whole module

- **Add a shape when the current one is genuinely the constraint.** Not because a workflow exists
- Each shape adds coordination cost, and coordination cost is paid by people
