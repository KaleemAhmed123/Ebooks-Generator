## Synthetic Data Generation

Using a model to create training or evaluation examples when real labelled data
is scarce. Fast, and it inherits the generator's blind spots.

Synthetic edge cases filled gaps in a sparse evaluation set. They also
over-represented the phrasings the generator likes, so real samples had to be
mixed back in.

### How it works

When real labelled examples are scarce — a new feature, a rare edge case, a
document type you have seen twice — a model can generate plausible ones.

It is genuinely useful for coverage. A hundred variations of an edge case you
have encountered once gives your evaluation set representation it could not
otherwise have.

**The limitation is structural: generated data reflects the generator.** It uses
the phrasings that model tends to produce, contains the errors it tends to make,
and misses the failure modes it does not know about.

Train or evaluate purely on synthetic data and you are measuring against a
simulation of reality shaped by the same technology you are testing.

Real data is messier in the ways that matter — truncated inputs, mixed
languages, formatting nobody would think to invent.

### In practice

Use it to **augment rather than replace**, and keep enough real examples to
anchor the distribution.

A useful check: score the same system on the synthetic portion and the real
portion **separately**. A large gap means the synthetic set is easier than
reality, and your headline number is optimistic by exactly that much.
