## Context Engineering

Deciding what enters the context window at all, and in what order. At long
context lengths this matters more than the wording of the prompt.

Cutting from forty retrieved chunks to the six best, strongest first, improved
accuracy and cut cost by 70% at the same time.

### How it works

Prompt engineering is about wording. Context engineering is about occupancy —
what gets a place in the window, and where.

The window is one fixed budget shared by everything: system prompt, tool
definitions, conversation history, retrieved documents, and the space the answer
needs. A token spent on one is unavailable to the others.

Two forces push against simply filling it. Cost scales directly with input
tokens. And attention is uneven — material buried in the middle of a long
context is measurably missed more often than material at the beginning or the
end.

So the discipline is subtractive. Fewer, better-chosen chunks, deliberately
placed, beat more chunks almost every time.

### In practice

A layout that works, in order:

| Position | What goes there | Why |
|---|---|---|
| First | system prompt, tool definitions | stable, so it caches |
| Next | the strongest retrieved material | early attention is reliable |
| Then | history, summarised once it is long | verbatim history is mostly waste |
| Last | the user's actual question | end attention is reliable too |

Then reserve output space explicitly. Running out of window mid-answer produces
a truncated response that looks like a model problem and is actually an
arithmetic one.
