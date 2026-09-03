## LLM-as-Judge

Using a model to score outputs against a rubric. Scales far beyond human review,
and carries its own biases.

A judge that prefers longer answers rewards verbosity. Randomising order, using
explicit criteria, and spot-checking against humans is what keeps the number
honest.

### How it works

Human review is the most reliable way to score open-ended output and the least
scalable. A model judge trades some reliability for enormous scale.

The setup is simple: give a judge model the input, the output and an explicit
rubric, and have it score against the criteria. Because it is a model, it
inherits model problems.

Three biases are well documented and worth knowing before trusting any number:

| Bias | Effect |
|---|---|
| Position | whichever option is shown first tends to win |
| Verbosity | longer answers score higher regardless of quality |
| Self-preference | a model favours text from its own family |

None of these disqualify the technique. They mean the judge has to be validated
rather than assumed correct — which is exactly what you would do with a human
reviewer you had just hired.

### In practice

The protocol that works: **randomise option order** on every comparison, **use a
rubric with explicit criteria** rather than asking which is better, and
**periodically score a sample by hand** to check the judge still agrees with
people.

If judge-versus-human agreement is low, the usual cause is an ambiguous rubric
rather than a weak judge. A panel of humans would disagree with each other on
that task too, and no amount of prompting fixes a question that has no agreed
answer.
