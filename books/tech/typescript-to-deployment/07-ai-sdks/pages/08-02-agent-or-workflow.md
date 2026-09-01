## Agent or workflow

- Letting the model decide the control flow is expensive, slow, and hard to test. Sometimes it is also unnecessary
- A **workflow** is code you wrote, calling a model at fixed points. An **agent** decides its own path
- **Most production features should be workflows.** The agent shape is for problems where the steps genuinely are not knowable in advance

| | Workflow | Agent |
|---|---|---|
| Control flow | your code | the model |
| Cost | predictable | unbounded without a budget |
| Testing | ordinary unit tests | needs an evaluation set |
| Debugging | a stack trace | a transcript |
| Fits | known steps | open-ended investigation |

### The workflow shapes worth knowing

- **Chain.** Output of one call feeds the next. Extract, then classify, then draft
- **Route.** A cheap model classifies, then dispatches to the right prompt or model. The highest-value pattern for cost control
- **Parallel.** Fan out independent calls with `Promise.all`, then combine. Three reviewers voting, or five fields extracted at once
- **Evaluate and revise.** One call produces, a second critiques, the first revises. Two calls, and a real quality gain on writing tasks

### The decision

- **Can you draw the flowchart? Then write the flowchart.** It will be cheaper, faster and testable
- Choose an agent when the number of steps depends on what is found along the way, as in debugging, research or a multi-system support query
- Starting with a workflow and adding autonomy where it is proven necessary is the order that ships
