## Coordinate Compression (Deep Dive) <span class="lv lv3"></span>

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
