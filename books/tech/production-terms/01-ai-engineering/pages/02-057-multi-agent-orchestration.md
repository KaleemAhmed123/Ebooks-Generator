## Multi-Agent Orchestration

Splitting work across specialised agents. Real benefits for parallelisable work,
and real cost in latency, tokens and debuggability.

Three agents debating a simple question is slower, dearer and worse than one
good prompt. Fanning out ten independent document reviews is a genuine win.

### How it works

Splitting work across several agents is appealing and frequently the wrong
choice, so it is worth being precise about when it helps.

| Helps when | Because |
|---|---|
| Subtasks are independent and parallel | wall-clock time genuinely drops |
| Subtasks need different tools or permissions | isolation becomes a security property |

| Does not help when | Because |
|---|---|
| Agents "discuss" a problem | each hop adds latency, tokens and a lossy handoff |
| The work is inherently sequential | you have added coordination to a straight line |

**The costs compound in a way that is easy to underestimate.** Three agents is
three times the failure modes, and a debugging story where you have to
reconstruct who told whom what before you can even see the bug.

### In practice

If you do split, keep handoffs **explicit and structured** — a defined schema
passed between agents, not free-form prose that the next agent reinterprets in
its own way.

Trace the whole run under one identifier. Without that you will be correlating
separate logs by timestamp during an incident, which is precisely the moment you
can least afford to be doing it.
