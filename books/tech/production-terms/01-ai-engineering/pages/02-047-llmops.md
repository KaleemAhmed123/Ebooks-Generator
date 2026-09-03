## LLMOps

The operational practice around LLM applications: versioning prompts and models,
evaluating changes, monitoring quality and cost, and rolling back safely.

A team shipping prompt edits straight to production with no eval, no version
history and no cost dashboard has a demo. Adding those three makes it a product.

### How it works

Traditional software is deterministic. The same input produces the same output,
and a test either passes or fails.

LLM systems break both assumptions. Output varies between identical calls,
quality is a distribution rather than a boolean, and the model underneath can
change without you deploying anything at all.

LLMOps is ordinary engineering discipline adapted to that reality. Four things,
none of them exotic:

**Version everything that affects output as one unit** — prompt, model,
retrieval configuration, tool definitions. Changing any of them changes
behaviour, so they belong together.

**Evaluate against a fixed dataset**, not by trying a few examples and forming
an impression.

**Monitor quality continuously**, not only latency and error rate. A system can
be fast, error-free and getting steadily worse.

**Be able to roll back the whole bundle**, not just the code.

### In practice

The mental shift that unlocks the rest is treating **a prompt change as a
deployment**.

Teams routinely let prompts be edited in a database by whoever noticed a
problem, with no version history, no evaluation and no rollback — while the code
path around it goes through review and CI. The prompt has more effect on output
than most of that code does.
