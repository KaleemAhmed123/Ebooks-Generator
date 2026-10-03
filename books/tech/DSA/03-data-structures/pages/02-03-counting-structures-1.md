## Counting Structures: Arrays vs Hash Maps <span class="lv lv1"></span>

- **What it is:** Using an Array instead of a Hash Map to store frequencies
- **When to reach for it:** The keys are integers within a small, known range (e.g., characters `a-z`, or numbers `1-1000`)
- **Why it works:** An Array is just a Hash Map with a perfect, collision-free hash function: `hash(x) = x`

### The Array Speed Advantage

If you are counting the frequencies of lowercase English letters, you have a choice:
1. `const map = new Map<string, number>()`
2. `const arr = new Array(26).fill(0)`

You should **always** choose the Array.
- **No Hashing Overhead:** A Hash Map must run a string through a hash function and handle potential collisions. The Array does `char.charCodeAt(0) - 97` and accesses memory directly.
- **No Object Allocation:** Hash Maps constantly allocate small nodes in memory for new keys. The Array is allocated once.
- **Spatial Locality:** Array elements are contiguous. CPU caches love them.
- In competitive programming or strict interviews, the Array will execute roughly 10x faster than the Hash Map for character counting.

### When Arrays Fail (Sparse Keys)

- You cannot use an Array if the keys are massive or negative.
- If the problem states: "Array contains numbers between -10^9 and 10^9", you cannot allocate an Array of size 2 billion. It will Memory Limit Exceed.
- If the keys are sparse (e.g., you only have 5 numbers, but their values are in the billions), an Array wastes gigabytes of memory. A Hash Map only allocates memory for the 5 keys that actually exist.
