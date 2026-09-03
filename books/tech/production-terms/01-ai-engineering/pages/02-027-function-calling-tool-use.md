## Function Calling / Tool Use

The model emits a structured call to a tool you defined; your code executes it
and returns the result. The model never runs anything itself.

The model decides to call `get_order(id)`. Your backend executes it with the
current user's permissions — because the arguments the model chose are untrusted
input.

### How it works

A model on its own can only produce text. Function calling is the convention
that lets that text act on the world.

You describe the available tools — name, purpose, parameters. When the model
decides one is needed it emits a structured request naming the tool and its
arguments. Your code executes it and feeds the result back, and the model
continues with that information in hand.

**The model never runs anything.** It produces a request; your code decides
whether to honour it. Every safety property follows from that division.

Which means the arguments are untrusted input, in exactly the sense that a form
field submitted by an anonymous stranger is untrusted — because they can be
influenced by anyone whose text reaches the context, including a document you
retrieved.

### In practice

Two consequences worth building in from the start.

**Validate arguments against a schema, and execute with the end user's
permissions** — never with broad service credentials. A tool that runs as the
service is a tool that will eventually read somebody else's data because a
document told it to.

**Tool descriptions are prompt engineering.** Wrong-tool selection is almost
always caused by vague or overlapping descriptions rather than by model
weakness, and rewriting a description is far cheaper than changing models.
