## When the obvious pattern is wrong

- Pattern recognition is fast. Pattern *validation* is careful. The fastest way to fail an interview is to commit to the wrong pattern in the first 30 seconds and spend 25 minutes debugging the consequences
- This page catalogues the most common misdirections — problems where the surface looks like one pattern but the structure demands another

### Misdirection 1: Looks like sliding window — isn't

- **Surface signal:** "Find the longest subarray where..."
- **The trap:** You reach for sliding window because you see "subarray" and "longest." But the window's validity condition is not monotonic
- **Example:** "Find the longest subarray where the sum is exactly K" — with negative numbers in the array. Shrinking the window can increase *or* decrease the sum. The left pointer might need to move backward (it can't). Sliding window breaks
- **The real pattern:** Prefix sum + hash map. Store prefix sums and look for `prefixSum[j] - prefixSum[i] = K`
- **The diagnostic:** Before committing to sliding window, ask: "If I shrink the window, does the validity metric move in only one direction?" If not, the monotonicity assumption is broken

### Misdirection 2: Looks like DP — greedy works

- **Surface signal:** "Find the minimum/maximum of a sequence of choices"
- **The trap:** You see overlapping subproblems and reach for DP. But the problem has the greedy choice property — at each step, the locally optimal choice is also globally optimal
- **Example:** "Given a set of intervals, find the maximum number of non-overlapping intervals." You could do O(n²) DP over intervals. Or you could sort by end time and greedily pick the earliest-ending interval. The greedy solution is O(n log n) and simpler
- **The diagnostic:** Ask: "If I take the locally best option now, can it ever block a strictly better global outcome?" If the exchange argument shows no swap improves the result, greedy works. DP is overkill

### Misdirection 3: Looks like binary search — predicate isn't monotonic

- **Surface signal:** "Find the minimum/maximum value that satisfies a condition"
- **The trap:** You frame it as binary search on the answer space. But binary search requires the predicate to be monotonic: if `f(x) = true`, then `f(x+1) = true` for all x+1 in the range (or the reverse)
- **Example:** "Find the smallest window size where the window contains all unique elements of the array." If some windows of size 5 work and some don't, the predicate "window of size k contains all elements" is not monotonic in k when the elements are distributed unevenly. You need a different framing
- **The diagnostic:** Check: "If the condition holds for value X, does it hold for all values ≥ X (or all values ≤ X)?" If not, binary search on the answer will give wrong results

### Misdirection 4: Looks like BFS — but costs aren't uniform

- **Surface signal:** "Find the shortest path from A to B"
- **The trap:** You run BFS because BFS finds shortest paths. But the edges have different weights. BFS treats every edge as cost 1. With weighted edges, BFS finds the path with fewest edges, not the path with lowest total cost
- **The real pattern:** Dijkstra's algorithm. Or if all weights are 0 or 1, 0-1 BFS with a deque
- **The diagnostic:** Ask: "Are all edge costs equal?" If yes, BFS. If no, you need a priority queue

### The skill

- Pattern recognition gets you to a candidate technique in 10 seconds
- Pattern validation takes 30 more seconds to confirm the technique's assumptions actually hold
- The 30 seconds of validation saves 25 minutes of debugging the wrong approach
- **Always check the assumptions before writing code**

:::interview
"I think this is a sliding window problem." — Before committing, check: does shrinking the window always move the validity metric in one direction? If the array has negative numbers, the sum can go either way when you shrink. That breaks the monotonic assumption sliding window needs. Consider prefix sums instead.
:::
