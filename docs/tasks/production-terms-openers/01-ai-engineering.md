# AI Engineering

## How to read this booklet

One hundred and one terms, alphabetical, one to a page. Each gets what it means,
where it bites, how it actually works, and the thing to watch once it is running.

This booklet is longer per term than the others in the series. That is
deliberate: the vocabulary here is four years old, most of it has no settled
definition yet, and a one-line gloss would be useless for exactly the terms
people are least sure about.

### What is in scope

Building products on models you call rather than models you train. Retrieval,
evaluation, agents, guardrails, routing, cost control, and the document
pipelines that feed all of it.

### What is deliberately out

The training side. Fine-tuning methods, preference optimisation, distillation,
GPU utilisation and VRAM budgeting were all cut. They are real work and they are
somebody else's job — a production engineer shipping on provider APIs does not
say "catastrophic forgetting" out loud, and does not need to.

Also cut: inference-server internals such as speculative decoding and the
prefill/decode split. They matter enormously if you operate the server. They do
not change a single decision if you call an endpoint.

### The thing worth knowing before you start

Almost nothing here fails loudly. Retrieval quietly misses a document,
groundedness quietly drops, an agent quietly loops, a prompt change quietly
regresses one input class in twenty. The recurring theme across all one hundred
and one terms is that you have to go looking, because none of it pages you.
