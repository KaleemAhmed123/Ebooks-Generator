## ReAct Pattern

Interleaving reasoning and acting: the model states why it is calling a tool,
calls it, then reasons about the result. The trace is what makes debugging
possible.

The trace shows the agent searched by the wrong field name three times. Without
the reasoning steps you would see three failed tool calls and no reason for any
of them.

### How it works

Before each tool call the model states why it is making it. Then it makes it.
Then it reasons about what came back.

**The practical value is not that the model performs better — it is that the run
becomes legible.** Without the reasoning steps, a failed agent run is a list of
tool calls, and you are left inferring intent from arguments.

With them you can see the mistake. *"I need the customer's order history, so I
will search by email"* followed by an empty result tells you immediately that
the agent had the wrong lookup key. Not that the tool was broken. Not that the
model was confused. One specific incorrect assumption, visible in one line.

That difference turns agent debugging from archaeology into reading.

### In practice

The reasoning text also gives you something to **evaluate separately**.

You can score whether the stated plan was sensible independently of whether the
outcome was correct. That distinguishes "good plan, broken tool" from "the tools
worked and the plan was wrong" — two problems that look identical from the
outcome alone and need completely different fixes.

One is an engineering bug. The other is a prompt or a model choice.
