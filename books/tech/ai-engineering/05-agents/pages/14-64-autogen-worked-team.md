## AutoGen: a worked team

- A minimal two-agent team that writes and refines copy, with an explicit stop condition. This is the shape of most AutoGen programs.

:::mint
```python
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.conditions import TextMentionTermination

writer = AssistantAgent("writer", model_client=model,
    system_message="Write a one-line product tagline.")
critic = AssistantAgent("critic", model_client=model,
    system_message="Critique it. Reply 'APPROVED' only when it is excellent.")

team = RoundRobinGroupChat(
    [writer, critic],
    termination_condition=TextMentionTermination("APPROVED"),
)

await team.run(task="Tagline for a privacy-first email app.")
```
:::

- **Read the assembly:** define agents with roles → put them in a **team** with a turn policy (`RoundRobin` alternates them) → set a **termination condition** (`TextMentionTermination("APPROVED")` stops when "APPROVED" appears) → `run` with the task.
- **Trace what happens:** writer proposes a tagline → critic critiques → writer revises → critic eventually replies "APPROVED" → the mention triggers termination → the run ends with the final tagline. It is the evaluator-optimizer loop (14-40), expressed as a conversing team.
- **Everything hangs on the termination condition.** Remove it and the critic keeps finding nits forever. The condition is not optional polish — it is the brake, exactly as in the raw loop (14-05).

:::interview
"Show the essential parts of an AutoGen multi-agent program."

Three: the **agents** (each an `AssistantAgent` with a role-defining system message), the **team** with a speaker policy (round-robin or a model-based selector), and the **termination condition** (a keyword mention, max turns, or a custom check). You `run` the team on a task and the agents converse until termination. Forgetting the termination condition is the classic bug — the conversation never ends and costs spiral.
:::
