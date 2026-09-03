## Tool Sandboxing

Running model-invoked tools with minimum permissions and strict resource limits,
because the model's chosen arguments are untrusted input.

A code-execution tool without a sandbox is remote code execution with extra
steps. Network denied, filesystem scoped, CPU and wall-clock capped, no
credentials in scope.

### How it works

A tool call's arguments are chosen by the model, and the model's context can be
influenced by anyone whose text reaches it — a user, a fetched web page, a
document in your own corpus. **Those arguments are untrusted input in the
strictest sense.**

The code-execution case is the obvious one, but the principle applies to every
tool. A database query tool without scoping is arbitrary data access. A file
tool without a path restriction is arbitrary file access.

Sandboxing means executing with the minimum capability that still works:

| Control | Setting |
|---|---|
| Network | denied, or an explicit allowlist |
| Filesystem | scoped to a temporary directory |
| Resources | CPU, memory and wall-clock capped |
| Credentials | none in the environment |
| Output size | capped before it re-enters the context |

That last row matters more than it looks — a tool returning a large response is
both a cost problem and an injection vector.

### In practice

**Run tools with the permissions of the end user, not of the service.**

A tool that can read any record will eventually be talked into reading the wrong
one, and no prompt instruction prevents that reliably.

Enforcing authorisation at the tool boundary is what turns that outcome from a
data leak into a denied request — and the denial appears in your logs, which is
how you find out it was attempted.
