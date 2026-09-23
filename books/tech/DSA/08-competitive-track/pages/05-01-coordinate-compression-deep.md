## Coordinate Compression (Deep Dive) 🔴

In competitive programming, you often encounter problems involving ranges or coordinates up to 10⁹. 
If you need to build a Segment Tree, a Fenwick Tree, or simply mark visited positions on an array, an array of size 10⁹ will cause a Memory Limit Exceeded (MLE) error. 

**The Insight:** If there are only N = 10⁵ events happening at those coordinates, at most 2 times 10⁵ coordinates actually matter. The vast, empty space between coordinates is completely irrelevant.

### The Transformation

Coordinate Compression takes a sparse set of massive coordinates and maps them to a dense set of small integers [0, K-1], where K is the number of unique coordinates.

**Example:**
Original coordinates: `[10, 1000000, 10, -500]`
Sorted unique coordinates: `[-500, 10, 1000000]`
Mapping:
- `-500` to `0`
- `10` to `1`
- `1000000` to `2`

Now, instead of updating a Fenwick tree at index 1000000, we update it at index 2. The array only needs to be size 3.

### Implementation (C++)

This is the standard, highly-optimized 3-line C++ idiom for coordinate compression.

```cpp
vector<long long> a = {10, 1000000, 10, -500};
vector<long long> vals = a; // Copy original values

// 1. Sort the copy
sort(vals.begin(), vals.end());

// 2. Remove duplicates
vals.erase(unique(vals.begin(), vals.end()), vals.end());

// 3. Replace original array with compressed indices
for (int i = 0; i < a.size(); i++) {
    // lower_bound finds the index of a[i] in the sorted unique array
    a[i] = lower_bound(vals.begin(), vals.end(), a[i]) - vals.begin();
}

// a is now: [1, 2, 1, 0]
```

### The "Points vs Intervals" Trap

If the problem asks you to calculate the **total length** of unions of intervals, you must map the compressed indices back to their original values when calculating length.
- If compressed index 1 represents `10` and index 2 represents `1000000`.
- The distance between index 1 and 2 in your Segment Tree is 1 step.
- The actual physical length is `vals[2] - vals[1] = 999990`.

You must store `vals` (the reverse mapping array) and use `vals[R] - vals[L]` whenever you need the physical length.
