### Cycles

- **Cyclic:** The graph contains at least one loop. You can start at node `A`, travel through the graph, and eventually end up back at node `A` without retracing your exact steps.
- **Acyclic:** The graph has no loops. 
- A **DAG** (Directed Acyclic Graph) is the most important type of graph in computer science. It represents dependencies (e.g., this file must be compiled before that file).

### The trap

- **Assuming Undirected:** If an interview problem says "There is a road between City A and City B", candidates often blindly code a directed edge `A -> B` and forget to add `B -> A`.
- **The fix:** Unless the problem explicitly uses words like "one-way", "directs to", or "points to", always assume real-world physical connections are undirected.
