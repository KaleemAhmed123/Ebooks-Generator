## Data Structure Recognition Drills <span class="lv lv1"></span>

These drills are designed to test your architectural judgment. Do not write code. Just read the constraint and immediately name the required data structure.

### Drill 1: The Stock Span
**Scenario:** You receive a daily stream of stock prices. For each day, you must output the number of consecutive previous days where the price was less than or equal to today's price.
**The Insight:** When a massive price arrives, all smaller previous prices are rendered irrelevant for future span queries—they are dominated. We need an elimination machine that looks backward.
**Structure:** Monotonic Stack (Decreasing).

### Drill 2: The Continuous Median
**Scenario:** You receive a continuous, infinite stream of numbers. At any given moment, you must output the median of all numbers seen so far.
**The Insight:** The median is the boundary between the smaller half of numbers and the larger half. We don't care about the sorted order of the extremes, only the middle two numbers. We need constant access to the largest of the smalls, and the smallest of the larges.
**Structure:** Two Heaps (A Max-Heap for the bottom half, a Min-Heap for the top half).

### Drill 3: The Lexicographical Autocomplete
**Scenario:** Given an array of 100,000 strings, you receive queries consisting of a prefix (e.g. "pre"). You must return the lexicographically smallest string in the array that starts with that prefix.
**The Insight:** We need to group strings by shared prefixes. A Hash Map fails at partial matches. We need a structure that models character-by-character progression.
**Structure:** Trie (Prefix Tree).

### Drill 4: The Dynamic Range Sum
**Scenario:** An array of $10^5$ elements. You receive $10^5$ queries. Some queries ask to update the value at index `i`. Other queries ask for the sum of elements from index `L` to `R`.
**The Insight:** A pre-computed prefix-sum array answers range sums in O(1), but updating it takes O(N). We need a structure that balances updates and range queries at O(log N). Since the operation is commutative addition, we can use the lightweight option.
**Structure:** Fenwick Tree (Binary Indexed Tree) or Segment Tree.
