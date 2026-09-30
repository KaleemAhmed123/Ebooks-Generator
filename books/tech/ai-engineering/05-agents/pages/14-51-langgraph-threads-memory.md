## LangGraph: threads and short-term memory

- A **thread** is one conversation's persisted history, keyed by `thread_id`. With a checkpointer, threads give an agent **short-term memory for free** — the state (including all `messages`) survives between separate `invoke` calls. **[VERIFY current API]**

:::mint
```python
config = {"configurable": {"thread_id": "user-42"}}

app.invoke({"messages": [("user", "My name is Sam.")]}, config)
app.invoke({"messages": [("user", "What's my name?")]}, config)
# → "Your name is Sam." — the second call sees the first's messages,
#   because both share thread_id "user-42" and the checkpointer restored it.
```
:::

- **How it works:** each `invoke` with a given `thread_id` **loads** that thread's last checkpoint, appends the new input (via the `add_messages` reducer), runs, and **saves** again. The model is still stateless — LangGraph reconstructs the conversation from the checkpoint each call. Same `thread_id` = same ongoing conversation; a new `thread_id` = a fresh one.
- **This is the short-term memory of 14-20**, handled by the framework. You do not manage a message list across requests; you pass a `thread_id` and the checkpointer does it. Multiple users are just multiple `thread_id`s against the same graph.
- **Its boundary:** a thread is *one conversation*. Cross-conversation, cross-user *long-term* memory (the semantic/episodic memory of the memory cluster) is a **different** mechanism — the `Store` (14-56) — because it must be shared across threads, not scoped to one.

:::interview
**"How does a LangGraph agent remember earlier turns across separate API calls?"** Threads plus a checkpointer. Each call passes a `thread_id`; the checkpointer loads that thread's saved state (all prior messages), runs with the new input appended, and saves again. The stateless model gets the full reconstructed history every time. That covers *short-term* memory within one conversation. For *long-term* memory shared across conversations you use the separate cross-thread `Store`, not threads.
:::
