## Temperature / Top-p

Sampling controls. Temperature flattens or sharpens the distribution; top-p
limits sampling to the smallest set of tokens covering probability p.

Extraction and classification want temperature 0 for reproducibility. Creative
copy wants 0.8. Adjusting both at once makes results impossible to reason about.

### How it works

At every step the model produces a probability for every token in its
vocabulary — not a single answer, but a ranked distribution. Sampling settings
decide how you pick from it.

**Temperature reshapes the distribution.** At 0 you always take the
highest-probability token. Raising it flattens the curve so less likely tokens
get a real chance, which reads as creativity and, past a point, as incoherence.

**Top-p discards the tail.** It keeps only the most likely tokens that together
account for p of the probability, then samples from what remains. This adapts to
context: where the model is confident, few tokens survive; where it is genuinely
uncertain, more do.

**Use one.** Adjusting both means you can no longer reason about what changed
between two runs.

### In practice

A caution worth internalising early: **temperature 0 is not a correctness
setting.**

It makes the model consistently produce its most likely answer — which is just
as consistently wrong when the model is wrong. It buys reproducibility for
debugging and evaluation. It does not buy accuracy, and the two get conflated
constantly.

Even at 0, output is not guaranteed byte-identical across provider updates or
differing batch composition.
