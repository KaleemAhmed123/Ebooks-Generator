## Tool Schema Design

Tool names, descriptions and parameter docs are prompt engineering. Bad
descriptions cause wrong-tool selection more often than model weakness does.

Renaming `search()` to `search_internal_docs()` and describing exactly when *not*
to use it cut wrong-tool selection from 22% to 4%.

### How it works

The model chooses tools based on nothing but their names, descriptions and
parameter documentation. **That text is the entire basis of the decision** — so
it is prompt engineering, not API documentation.

Most wrong-tool selection traces back to this rather than to model capability. A
tool called `search`, described as "searches", gives the model nothing to
distinguish it from three other search-like tools. It will guess, and it will
guess inconsistently, which is worse than guessing wrong.

Descriptions should say what the tool does, when to use it, and — the part
almost always missing — **when not to**. An explicit *"do not use this for
customer data; use `get_customer` instead"* resolves ambiguity far more
effectively than describing the correct tool more thoroughly.

Parameter descriptions matter equally. `date` invites any format. *"Date in
YYYY-MM-DD format, e.g. 2026-03-14"* gets one.

### In practice

**Tool count matters too.** Beyond roughly fifteen or twenty, selection accuracy
degrades — the model is choosing from a long list of partially overlapping
options, and no individual description fixes that.

Consolidating similar tools, or splitting the agent so each has a smaller
focused set, works better than continuing to refine wording on a list that is
too long to reason about.
