## Balance Two Heaps 🟡

- **What it is:** Keep the smaller half of the data in a **max-heap** and the larger half in a **min-heap**, with sizes equal or the max-heap one larger. The two tops are the middle of the data, so the median is one or two peeks away after every insertion
- **Signal:** "median of a data stream", "running median", "median of every sliding window", "maximise capital with at most k projects" (two heaps with different keys), any query about the middle of changing data
- **Why it works:** The median only depends on the boundary between the lower and upper halves, not on the order inside each half. A heap keeps exactly one end of a set ready, so a max-heap exposes the top of the lower half and a min-heap the bottom of the upper half. Each insertion moves at most one element between them: O(log n)
