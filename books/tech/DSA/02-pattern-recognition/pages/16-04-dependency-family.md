## The Dependency Family 🟢

- **What it is:** Problems where actions must be performed in a specific order because one action unlocks another
- **The signal:** "Prerequisites", "Course schedule", "Build system", "Shortest path in a DAG", "Longest path"
- **The mechanism:** Representing the problem as a Directed Acyclic Graph (DAG) and processing nodes in an order that respects the directed edges. We can only process a node when all its prerequisites (incoming edges) have been resolved

### The core techniques

| Technique | When to use | What it exploits |
|---|---|---|
| **Topological Sort (Kahn's)** | "Can you finish all courses?", "Valid build order" | Peeling away nodes with zero in-degree iteratively |
| **DAG Dynamic Programming** | "Longest path in a DAG", "Number of ways to reach X" | State transitions flow perfectly along the topological order |
| **Critical Path Method** | "Minimum time to finish all parallel tasks" | The longest path through dependencies determines the minimum time |

### The structural requirement: Acyclicity

- For a dependency chain to be resolvable, the graph **must not contain a cycle**. If Course A requires Course B, and Course B requires Course A, neither can ever be taken
- A Directed Acyclic Graph (DAG) is the mathematical structure that underpins all dependency logic. The absence of cycles guarantees that there is at least one valid linear ordering of the nodes (a Topological Sort)
- Many dependency problems secretly ask you to detect cycles. "Is this course schedule valid?" translates directly to: "Does this directed graph contain a cycle?"
