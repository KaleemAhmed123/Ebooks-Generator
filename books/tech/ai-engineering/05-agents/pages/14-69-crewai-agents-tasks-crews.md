## CrewAI: agents, tasks, and crews

- CrewAI has three core objects. Get these and you can read any CrewAI program.

:::mint
```python
from crewai import Agent, Task, Crew

researcher = Agent(
    role="Senior Researcher",
    goal="Find accurate, current facts on the topic",
    backstory="You are meticulous and cite primary sources.",
    tools=[search_tool],
)

research_task = Task(
    description="Research the 2026 state of {topic}.",
    expected_output="5 bullet points with sources.",
    agent=researcher,
)

crew = Crew(agents=[researcher, writer], tasks=[research_task, write_task])
result = crew.kickoff(inputs={"topic": "agent frameworks"})
```
:::

- **Agent** — *who* does the work: a role, goal, backstory, LLM, and tools. It is a persona-configured worker.
- **Task** — *what* to do: a description, the **expected output** (crucial — it tells the agent what "done" looks like), and the agent assigned to it. Tasks are the unit of work, and one task's output can feed the next (**context**).
- **Crew** — the *team*: agents plus ordered tasks plus a **process** (next page). `kickoff()` starts it with inputs.
- **`expected_output` does more than it looks** — a per-task success spec that shapes output and lets the next task rely on a known shape. Vague ones are a top cause of poor results; specific ones are the fix.

:::interview
"What are the core objects in a CrewAI program?"

Three. An **Agent** is a persona (role, goal, backstory, tools) — the *who*. A **Task** is a unit of work with a description, an assigned agent, and — importantly — an `expected_output` that defines done — the *what*. A **Crew** binds agents and ordered tasks with a process that governs execution, kicked off with inputs. The `expected_output` is the most under-used lever: a precise one steers the agent and lets downstream tasks depend on a known shape.
:::
