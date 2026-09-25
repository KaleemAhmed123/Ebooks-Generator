### The pages in this chapter

| Page | Pattern | Canonical problem |
|---|---|---|
| **10-02 Push the Context** | save the state before `[`, restore after `]` | Decode String (LeetCode 394) |
| **10-03 Cancel Against the Top** | the newcomer fights the top until one side stops | Asteroid Collision (LeetCode 735) |
| **10-04 Count the Balance** | a counter replaces the stack when only one bracket type exists | Minimum Add to Make Parentheses Valid (LeetCode 921) |
| **10-05 Monotonic Stack** | pop everything the newcomer beats | Next Greater Element |
| **10-07 Pop While It Pays** | monotonic stack with a budget of removals | Remove K Digits (LeetCode 402) |
| **10-08 Count Each Element's Reach** | previous/next smaller → contribution of each element | Sum of Subarray Minimums (LeetCode 907) |
| **10-09 Stack the Rows** | each matrix row becomes a histogram | Maximal Rectangle (LeetCode 85) |
| **10-10 Monotonic Deque** | a monotonic stack whose front can expire | Sliding Window Maximum (LeetCode 239) |
| **10-11 Build One from Another** | queue from stacks, min-stack, LRU | Implement Queue using Stacks (LeetCode 232) |

### The trap

- **`Array.prototype.shift()` as a queue** is O(n) per call; keep a head index (Module 07, 02-06)
