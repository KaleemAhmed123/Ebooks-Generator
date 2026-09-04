## Few-Shot Prompting

Putting worked examples in the prompt — an input and the output you want, a
handful of times — before the real input. Zero-shot gives the instruction and
nothing else; few-shot shows the shape instead of describing it. Brown et al.
(2020) named the paradigm for GPT-3: the task is specified by the demonstrations
alone, with no gradient updates.

Examples are the cheapest fix for format and edge-case failures, and usually
beat another paragraph of instructions. They are also fixed input tokens on
every call, so put them in the stable prefix where prompt caching can reach them.

**Pick the examples from the cases you get wrong, not the ones you get right.**
Examples of the easy path teach nothing the model was not already doing, and a
set that shares one accidental trait — all short, all one currency, all the same
date format — gets copied as if it were the rule.

## Fine-Tuning vs RAG vs Prompting

Prompting changes the instructions. RAG changes what the model knows at answer
time. Fine-tuning changes behaviour, format and tone. They get treated as
competing options when they solve different problems, and choosing wrong costs
months.

| Approach | Reach for it when |
|---|---|
| Prompting | first, always — instant and free to iterate |
| RAG | the information is missing, private, or newer than training |
| Fine-tuning | the model knows the material but will not produce your shape |

RAG keeps knowledge in your database, so updating it is an insert rather than a
training run. That property alone decides most cases, and the two combine well.

**The expensive mistake is fine-tuning to add facts.** The model may absorb some
of the material, but it will not reliably retrieve the right one, it cannot cite
a source, and every update means training again.
