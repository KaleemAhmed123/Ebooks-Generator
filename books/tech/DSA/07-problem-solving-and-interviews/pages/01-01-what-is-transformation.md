## What is Problem Transformation?

The hardest problems in coding interviews don't ask you to invent a new algorithm. They ask you to apply a standard algorithm to a data structure that doesn't naturally fit it.

**Problem Transformation** is the art of translating the input data into a different conceptual shape, running a textbook algorithm on that new shape, and translating the answer back.

### The Transformation Pipeline

1. **Observe the constraints and operations.** (e.g., "Find the shortest sequence of word mutations.")
2. **Identify the missing structure.** (e.g., "Shortest sequence screams BFS, but I don't have a graph.")
3. **Map the input to the structure.** (e.g., "Words are nodes. A 1-letter difference is an edge.")
4. **Execute the standard algorithm.** (e.g., Run BFS on the implicit graph.)
5. **Translate the output.**

### Why Interviewers Test This

FAANG interviews rarely ask "Implement Dijkstra." They ask "Find the cheapest flight with at most K stops."
They are testing two distinct skills:
1. Do you know standard algorithms?
2. Can you model real-world scenarios into abstractions those algorithms can process?

Transformation is how you bridge the gap between "I know 50 patterns" and "I can solve any problem."
The following pages document the 9 most common transformations used in competitive programming and high-end interviews.
