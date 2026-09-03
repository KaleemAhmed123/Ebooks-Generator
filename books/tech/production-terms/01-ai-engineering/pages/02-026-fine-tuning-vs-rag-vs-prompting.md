## Fine-Tuning vs RAG vs Prompting

Prompting changes instructions. RAG changes knowledge. Fine-tuning changes
behaviour and format. Teams reach for the third when they needed the second.

"The model doesn't know our policies" is a retrieval problem. "The model won't
follow our output format consistently" is a fine-tuning problem. They look alike
in a standup and are nothing alike in the work.

### How it works

These get treated as competing options when they solve different problems, and
choosing wrong costs months.

| | Changes | Reach for it when |
|---|---|---|
| Prompting | the instructions | almost always, first — it is instant and free to iterate |
| RAG | what the model knows at answer time | the information is missing, private, or newer than training |
| Fine-tuning | behaviour, format, tone | the model knows the material but will not consistently produce your shape |

RAG keeps knowledge in your database, so updating it is an insert rather than a
retraining run. That property alone decides most cases.

**The expensive mistake is fine-tuning to add facts.** It does not reliably
work. The model may absorb some of the material, but it will not reliably
retrieve the right fact, it cannot cite a source, and every update means
training again.

### In practice

The decision reduces to one question: is the model failing because it does not
**know** something, or because it does not **behave** the way you want?

Missing knowledge is RAG, essentially always. Wrong behaviour is prompting
first, then fine-tuning if prompting plateaus. And the two combine well — a
fine-tuned model that reliably produces your output format, fed current facts by
retrieval.
