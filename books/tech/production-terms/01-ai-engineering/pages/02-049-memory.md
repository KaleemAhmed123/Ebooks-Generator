## Memory

*short term vs long term*

Short-term memory is the conversation in context. Long-term memory is retrieved
from a store. Conflating them produces agents that either forget or drown.

Storing every message forever and injecting all of it fills the window with
noise. Summarising older turns and retrieving only relevant facts scales.

### How it works

"Memory" covers two unrelated mechanisms, and conflating them causes most memory
bugs.

| | Short-term | Long-term |
|---|---|---|
| Where it lives | the context window | a database |
| Persistence | none — resent each turn | across sessions |
| Completeness | exact and complete | only what you retrieve |
| Bound | the window size | storage, effectively unbounded |

Short-term memory is not stored anywhere. Your application resends the
conversation every turn, which is why long chats get slower and more expensive.

Long-term memory survives and can hold far more than a window fits, but only the
part you actually retrieve exists on any given turn.

**The naive approach — store every message and inject all of it — fails at both
ends.** It overflows the window, and it fills the context with irrelevant history
that crowds out what mattered.

### In practice

Working systems summarise old turns for the short term, and store **extracted
facts rather than transcripts** for the long term.

Deciding what is worth remembering is a product question more than a technical
one. Durable preferences and stable facts belong in long-term memory; transient
state from one task does not.

Getting it wrong is uncomfortable in a specific way: an assistant confidently
applying something the user mentioned once, months ago, in a different context,
feels considerably worse than one that simply forgot.
