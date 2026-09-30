## When the obvious pattern is wrong <span class="lv lv1"></span>

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
