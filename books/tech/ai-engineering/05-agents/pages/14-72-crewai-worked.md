## CrewAI: a worked crew

- A research-and-write crew end to end, showing how tasks chain and outputs flow. **[VERIFY current API]**

:::mint
```python
from crewai import Agent, Task, Crew, Process

researcher = Agent(role="Researcher", goal="Find current facts",
    backstory="Meticulous, cites sources.", tools=[search_tool])
writer = Agent(role="Writer", goal="Write a clear brief",
    backstory="Concise and structured.")

research = Task(description="Research {topic}.",
    expected_output="5 sourced bullet points.", agent=researcher)
write = Task(description="Write a 150-word brief from the research.",
    expected_output="A tight 150-word brief.", agent=writer,
    context=[research])                     # ← writer sees research output

crew = Crew(agents=[researcher, writer], tasks=[research, write],
    process=Process.sequential)
print(crew.kickoff(inputs={"topic": "MCP security"}))
```
:::

- **Trace the flow:** `kickoff` runs `research` first (the researcher searches and returns 5 sourced bullets), then `write` — whose `context=[research]` passes the research output as input, so the writer drafts *from* the facts, not from scratch. Sequential process, one clean handoff.
- **The `context` link is the wiring.** It is how one task's output becomes another's input — CrewAI's equivalent of an edge (LangGraph) or a message (AutoGen). Chain tasks with `context` and you have a pipeline; the `expected_output` on each keeps the handoffs well-shaped.
- **Compare the effort:** this is a complete two-agent pipeline in ~15 lines, readable by someone who has never seen the framework. That approachability is CrewAI's core value — and why it is a common first multi-agent framework.

:::interview
"How does data flow between agents in CrewAI?"

Through task `context`. Each task produces an output shaped by its `expected_output`, and a downstream task lists upstream tasks in its `context`, receiving their outputs as input. In a sequential process this makes a clean pipeline — researcher's findings feed the writer, whose draft feeds the editor. It's CrewAI's version of a LangGraph edge or an AutoGen message: the explicit link that turns independent agents into a coordinated flow.
:::
