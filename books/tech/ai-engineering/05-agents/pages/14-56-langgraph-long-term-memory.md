## LangGraph: long-term memory (the Store)

- Threads (14-51) give short-term memory *within* a conversation. For memory that persists *across* conversations and users — the semantic/episodic memory of the memory cluster — LangGraph provides a separate **Store**: a cross-thread key-value store the graph can read and write, with optional vector search.

:::mint
```python
from langgraph.store.memory import InMemoryStore   # dev
store = InMemoryStore()
app = g.compile(checkpointer=MemorySaver(), store=store)

def remember(state, *, store):                       # store injected
    ns = ("memories", state["user_id"])              # namespaced per user
    store.put(ns, "prefs", {"language": "Python"})   # write a fact
    hits = store.search(ns, query="coding language") # semantic recall
    return {...}
```
:::

- **Threads vs Store, the crucial distinction:**
  - **Checkpointer/thread** = one conversation's state, keyed by `thread_id`. Short-term.
  - **Store** = facts shared across all of a user's conversations, keyed by a **namespace** (e.g. per user). Long-term.
- **Namespaces** scope memory — `("memories", user_id)` keeps each user's memories separate (the privacy discipline of 14-33). Within a namespace you `put` and `get` facts by key, and `search` semantically if the store has embeddings.
- This is how you build the memory architectures of the memory cluster *inside* LangGraph: memory blocks and semantic facts in the Store, retrieved and injected into the graph's state at the start of a run.

:::interview
"Short-term vs long-term memory in LangGraph — what are the mechanisms?"

Short-term is the **checkpointer + thread**: per-`thread_id` conversation state, restored each call. Long-term is the **Store**: a cross-thread, namespaced key-value store (often with vector search) for facts that must persist across conversations and users. Threads are scoped to one conversation; the Store is scoped by namespace (per user), which is where you implement semantic/episodic memory and keep users' memories isolated. Using threads for long-term memory is a common mistake — it doesn't cross conversations.
:::
