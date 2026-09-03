## Abstention Policy

*escalation*

Defining when the system should decline to answer and hand off, instead of
producing a confident guess.

Retrieval returns nothing above the similarity floor. The correct output is "I
don't have that" plus a route to a human — not a fluent, unsupported answer
assembled from training memory.

### How it works

Instruction-tuned models are shaped to be helpful. When they do not know
something they tend to answer anyway, because not-knowing is not a state they
naturally express.

An abstention policy makes declining a real path rather than something you hope
the model chooses. The clearest trigger is retrieval: nothing came back above
the threshold, so there is nothing to ground an answer in.

The other triggers are the request falling outside supported scope, required
fields failing validation, and a groundedness check finding claims the retrieved
context does not support.

Declining has to route somewhere. "I don't have that" on its own is a dead end.
"I don't have that — here is how to reach support" is a product.

### In practice

Track the abstention rate, with bounds on **both** sides. Too low and the system
is answering things it should not, which is hallucination wearing a helpful
face. Too high and it is useless, and people stop asking.

| Trigger | Fires when |
|---|---|
| Retrieval floor | nothing above the similarity threshold |
| Scope | the request is outside what the corpus covers |
| Validation | a required field could not be extracted |
| Groundedness | the answer makes claims the context does not support |

Read a sample of abstained requests every week. They are the cheapest map you
will get of where the corpus is genuinely missing something.
