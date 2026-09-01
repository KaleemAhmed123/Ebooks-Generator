### The two things to remember

- **`interrupt` throws and the state is checkpointed.** The resume replays the node from its start, so anything before the `interrupt` runs twice
- **`MemorySaver` is for development.** Production needs the Postgres or Redis checkpointer, or a restart loses every paused run
