## Cost per Request

Input and output tokens are priced differently, and output is usually several
times more expensive. Modelling the cost is an engineering task, not a finance
one.

A 12,000-token system prompt across 200,000 daily requests dominates the bill,
even though users only type forty tokens each. Caching and trimming the preamble
were the highest-leverage fix available.

### How it works

Two things surprise people about the pricing. Input and output are billed at
different rates, with output typically several times more expensive per token.
And input cost is dominated by whatever you send *every time*, not by what the
user typed.

The second point is the one that matters. If your system prompt, tool
definitions and retrieved context total 12,000 tokens and the user sends forty,
then 99.7% of your input cost has nothing to do with the user at all.

So the levers are not where intuition puts them:

| Lever | Effect |
|---|---|
| Shorten user-facing answers | small |
| Trim the fixed preamble | large |
| Cache the stable prefix | large |
| Retrieve six chunks instead of forty | large |
| Change model | large, and usually the last resort |

### In practice

Log per-request cost with tags — feature, tenant, model — from the first day. A
monthly invoice tells you nothing you can act on.

Tagged data routinely shows that one rarely used feature accounts for a large
share of spend. That is a five-minute product conversation rather than a month
of optimisation work, and you cannot have it without the tags.
