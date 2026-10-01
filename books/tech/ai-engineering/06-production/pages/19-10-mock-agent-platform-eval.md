## Mock: agent platform — eval, failure, tradeoffs

- **Eval is trajectory-based, not single-output** (Booklet 5). You score the *whole run*: did it reach the goal (outcome), was the path sensible and efficient (trajectory), did each tool call succeed (component)? A one-shot output eval cannot judge a multi-step agent — a right answer reached by a reckless path is still a bad agent in production.
- **Failure modes** are the ones that make autonomy scary:

| Failure | Response |
|---|---|
| crash mid-run | durable checkpoint → resume exactly-once (17-17/18) |
| infinite loop / overspend | per-run budget + step cap + kill switch |
| prompt injection hijacks tools | least-privilege sandbox, break the trifecta, confirmation gates |
| irreversible bad action | propose-then-commit, human approval, reversibility by design |
| silent low-quality drift | trajectory eval sampled in production |

- **Tradeoffs probed.** *Autonomy vs control* — more autonomy is more capable and more dangerous; gate consequential actions, let cheap reversible ones run free (Booklet 5's autonomy ladder). *Single agent vs multi-agent* — multi-agent adds capability and failure surface (Booklet 5's MAST); use it only when the task genuinely decomposes. *Checkpoint frequency* — more checkpoints mean cheaper recovery but higher overhead.

:::interview
"An agent on your platform sent a customer the wrong refund. How do you prevent the next one?"

Defence in depth around *actions*: consequential, irreversible actions (refunds, emails, deletes) go through **propose-then-commit** with a validation step and human confirmation, tools run **least-privilege** so a hijacked agent can't reach beyond its task, and every run is **checkpointed and trajectory-evaluated** so I can replay exactly what it did and add the failing case to the eval gate. The mindset — assume the agent *will* sometimes be wrong or hijacked, and design so a wrong action is caught or reversible rather than trusting the model to be right — is Module 18's AI-control framing applied to a product.
:::
