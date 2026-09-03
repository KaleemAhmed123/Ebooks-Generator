## Context Window

The maximum number of tokens a model can attend to in one request — prompt and
output together. Past it, content is truncated or the call errors.

An 8k-context model given a 10k-token document sees only part of it. The summary
silently omits the beginning, and nothing warns anyone.

### How it works

The window is the total amount of text the model can consider at once, and
everything shares it: the system prompt, the conversation so far, retrieved
documents, and the answer about to be written.

**Output comes out of the same budget.** With a 128,000-token window and a
127,000-token prompt, there is almost no room left to reply. This is the part
most often missed, because the prompt fits and the failure looks like the model
refusing to finish.

The second thing worth internalising: the model has no memory between calls. A
conversation that feels continuous is your application re-sending the entire
history every single turn. That is why long chats get slower and more expensive
— you are resending more text each time, and paying for all of it again.

### In practice

Going over the window produces one of two behaviours, and which one you get
depends on the provider: a hard error, or silent truncation.

**Silent truncation is the dangerous one.** Your summary of a long document
quietly omits its opening, the answer looks plausible, and nothing anywhere
records that half the input was discarded.

Count tokens before sending rather than after failing, and always reserve
headroom for the response. Both are a few lines of code, and both turn a silent
wrong answer into a visible error you can handle.
