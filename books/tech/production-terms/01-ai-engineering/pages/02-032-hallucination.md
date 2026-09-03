## Hallucination

Confidently generated content that is not true. Fluency and correctness are
separate properties, and the model has no signal telling it which one it just
produced.

A legal assistant answers two hundred questions and cites eight cases that do
not exist. Four percent is fine for brainstorming and disqualifying for legal
work.

### How it works

A model generates by repeatedly choosing a plausible next token. That is the
whole mechanism. There is no separate step in which it checks whether what it is
producing is true.

So fluency and accuracy come out of the same process and look identical. A
fabricated citation has the same confident cadence as a real one, because both
were produced the same way. The model holds no internal signal distinguishing
them, which is why asking "are you sure?" is close to useless.

**This is not a bug being slowly fixed.** It is a direct consequence of how the
technology works, and it means the system around the model has to assume wrong
output will occur.

The question is never whether it will hallucinate. It is what happens when it
does, and who notices.

### In practice

That reframing is what makes it tractable. Five mechanisms, none of which
eliminate it:

| Mechanism | What it buys |
|---|---|
| Grounding | the model retrieves instead of recalling |
| Citations | claims become checkable in seconds |
| Structured output | the shape is constrained, so junk fails validation |
| Evaluation | you know the rate instead of guessing it |
| Abstention | the system can decline rather than invent |

Together they make hallucination **visible and bounded**, which is what
production requires. Eliminating it is not on the table.
