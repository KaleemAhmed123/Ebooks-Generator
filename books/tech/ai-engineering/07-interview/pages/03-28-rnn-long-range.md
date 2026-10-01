## What was the long-range dependency problem in RNNs, and how did LSTMs help?

- An **RNN** updates a hidden state each step. To connect token 1 to token 100, the signal passes through 100 multiplications — gradients **vanish** (shrink to zero) or **explode** over that many steps, so the model can't learn long-range links.
- **LSTMs** (and GRUs) add a **cell state** with gates — input, forget, output — that let information flow across many steps with **additive** updates rather than repeated multiplication. The forget gate chooses what to keep, easing (not eliminating) the decay.
- It helped a lot, powering a decade of NLP, but LSTMs still degrade over very long contexts and still can't parallelise over time.
- Attention solved the root issue differently: instead of carrying state through time, give every position direct access to every other — path length 1, no decay.

:::interview
What's really being tested:

that vanishing/exploding gradients *through time* are the root cause, LSTM gates are a partial additive fix, and attention sidesteps it entirely with direct connections.
:::
