## How do you aggregate multiple agents' (or samples') answers reliably?

- When you run a task several times (self-consistency) or across several agents, you need to combine outputs. Methods:
  - **Majority vote / self-consistency** — sample N reasoning paths, take the most common final answer. Cheap, robust for tasks with a discrete answer; boosts accuracy on math/reasoning.
  - **Weighted voting** — weight by confidence or by an agent's track record on the task type.
  - **Judge/aggregator** — an LLM synthesises the candidates into one answer, resolving conflicts.
- Failure modes to name:
  - **Correlated errors** — if all samples share the same bias, voting just amplifies the wrong answer; diversity (different prompts/models/temperatures) is what makes voting work.
  - **No clear majority** on open-ended outputs — voting needs a comparable, discrete answer; for free text you need a judge.
- (For adversarial/untrusted agents, **Byzantine fault tolerance** needs 3f+1 nodes to tolerate f liars — relevant for cross-org agent systems, rarely for in-house ensembles.)

:::interview
What's really being tested: that self-consistency/voting works for discrete answers *with diverse samples*, amplifies correlated errors otherwise, and that open-ended outputs need a judge instead.
:::
