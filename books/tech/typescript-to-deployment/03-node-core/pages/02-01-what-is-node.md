# Module 2 - Node basics

## Who created Node.js

- Written by Ryan Dahl and released in 2009
- The idea: a web server should not need a thread per connection
- He took Chrome's V8 engine, added an event loop and non-blocking IO, and put JavaScript on the server

### What Node is

- A runtime, not a language and not a framework
- Three parts bolted together
  - **V8**, which compiles and runs JavaScript
  - **libuv**, a C library giving the event loop, timers and asynchronous IO
  - **Node's own bindings and standard library**, which is what `fs`, `http` and `net` actually are

### Why it took over the backend

- One language across the whole stack
- Non-blocking IO suits servers that mostly wait on databases and networks
- npm, which was the largest package registry within a few years

### What it is bad at

- CPU heavy work. One thread means one slow function stops everything
- Anything needing real parallel computation without extra machinery
