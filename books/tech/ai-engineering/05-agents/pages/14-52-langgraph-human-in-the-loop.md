## LangGraph: human-in-the-loop

- Some actions need a human's approval before they run — sending an email, spending money, deleting data. LangGraph's **interrupt** pauses the graph, hands control back to your app for a human decision, and resumes exactly where it stopped. This is why checkpointers matter. **[VERIFY current API — `interrupt`/`Command`]**

:::mint
```python
from langgraph.types import interrupt, Command

def approve_node(state):
    decision = interrupt({                       # PAUSE the graph here
        "action": "send_email",
        "to": state["draft"]["to"],
    })
    if decision != "approve":
        return {"messages": ["Cancelled by user."]}
    return {"messages": [send(state["draft"])]}

# ... graph runs, hits interrupt, returns control ...
app.invoke(Command(resume="approve"), config)    # RESUME with the answer
```
:::

- **The flow:** the graph runs until it hits `interrupt()`, which **saves state and returns** to your application with the payload (what needs approving). Your app shows a human the proposed action. When they decide, you call the graph again with `Command(resume=...)`, and it continues *from the interrupt* with the human's answer — no lost work.
- **Why it needs the checkpointer:** pausing safely means the full state is durably saved at the interrupt point, so resuming (possibly minutes or hours later, in a different process) restores everything. Interrupts are checkpointing put to work.
- **Beyond approval:** the same mechanism lets a human *edit* the proposed action, supply missing input, or steer a run — any point where you want a person in the loop. Flow: run → `interrupt` (save + return) → human ✓/✗ → `resume`.

:::interview
**"How do you add a human approval step to an agent?"** In LangGraph, `interrupt()`: at the node where approval is needed, call it with the proposed action; the graph saves state and returns control to your app, which shows a human the action. On their decision you resume with `Command(resume=answer)` and the graph continues from that exact point. It relies on the checkpointer to durably pause and resume. This is the standard way to gate consequential actions (sending, spending, deleting) behind a person.
:::
