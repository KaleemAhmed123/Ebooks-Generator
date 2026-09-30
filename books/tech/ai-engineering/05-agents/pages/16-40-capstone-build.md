## Capstone: build, verify, and close

- Build the research system (16-39) on the module's tools, stress-test it against its failure modes, and close the booklet.

- **Build it on a graph (14-44).** The lead, researchers, critic, and writer are **nodes** (or subgraphs, 14-54); the parallel researchers are a fan-out (16-15); the shared notes are the graph **state** (a blackboard, 16-06). Checkpointing (14-50) makes a long research run durable (15-17); streaming (14-55) shows progress; observability (14-113) traces every agent for debugging and cost.
- **Stress-test against the failure taxonomy (16-31):**
  - **Specification** — are the sub-questions a clean, complete decomposition? Ablate a researcher (16-35): does coverage drop? Roles non-overlapping (16-10)?
  - **Coordination** — do researchers duplicate work (bad decomposition) or the critic get ignored? Trace the interactions (16-35).
  - **Groupthink (16-32)** — researchers work *independently* (isolated contexts) so their findings are uncorrelated; the critic is a designated dissenter; the writer synthesizes but a *human* gives final approval — agreement is not truth.
  - **Cost (16-30)** — measure quality-per-dollar against a single-agent baseline; prune any agent that does not earn its cost.
  - **Termination (16-33)** — a hard budget and an explicit "done" condition prevent endless research.
- **The result:** a system that researches broadly and fast (parallel, isolated), verifies its claims (critic + human), and stays bounded and debuggable (guards + tracing) — multi-agent because the task genuinely demands it, safe because it wears the full stack.

:::note
**Booklet 5 in one arc.** You began with a model that could only map text to text, and end with systems that *perceive* the world (multimodal, Module 12), *act* on it through tools and protocols (Module 13), *reason, remember, and orchestrate* (Module 14), operate *autonomously and safely* (Module 15), and *coordinate as many* (Module 16). The through-line never changed: **a capable model is 10% of an agent; the engineering around it — the loop, tools, memory, verification, safety, and coordination — is the other 90%,** and that engineering is exactly what these emerging roles hire for. You can now build an agent, defend every design choice in an interview, and — just as important — know when *not* to. Booklet 6 takes it to production and society. The frontier is yours to build; build it deliberately.
:::
