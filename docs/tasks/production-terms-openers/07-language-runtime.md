# Language, Runtime & Platform

## How to read this booklet

Forty-one terms, alphabetical, across four runtimes: JavaScript and TypeScript,
Node.js and Express, Python and FastAPI, and Salesforce Apex. Each entry gets
three things and nothing else: what it means, where it bites, and a picture when
a picture is faster than a sentence.

### Why Salesforce sits beside Node and Python

Because a governor limit is the same kind of bug as a blocked event loop. Every
runtime here enforces a rule the language does not mention: Node gives you one
thread, CPython gives you one interpreter lock, Apex gives you a hundred queries
per transaction. Code that ignores the rule passes review, passes tests on one
record, and fails on the two-hundredth.

Sorting alphabetically rather than by platform is deliberate. `Bulkification`
lands next to `Blocking the Event Loop` because they are the same mistake in
different syntax — work inside a loop that should have happened once, outside it.

### What is deliberately not here

Syntax. Nothing here teaches `async/await`, decorators or Apex triggers. If you
need the tutorial, the language docs are better than any book.

Frameworks in their own right. React, Django ORM internals and LWC belong to
other booklets. What survives is the runtime underneath them — the part that
does not change when you swap the framework.

And anything the compiler already tells you. A term earned its page only if it
fails silently in development and loudly in production.
