## Dynamic Arrays <span class="lv lv1"></span>

- **What it is:** An array that resizes itself automatically when it runs out of space (`std::vector` in C++, `ArrayList` in Java, default `[]` in Python/JS)
- **The Contract:** O(1) amortised append, O(1) read. Still O(N) to insert/delete in the middle
- **Why it works:** It trades memory for speed by pre-allocating extra empty space

### The Resizing Mechanism

1. The dynamic array allocates a fixed-size block of memory (e.g. capacity = 4)
2. You append items until it is full
3. When you append the 5th item, the array detects it is out of space
4. It allocates a brand new block of memory **double the size** (capacity = 8)
5. It copies the old 4 items to the new block, taking O(N) time
6. It inserts the 5th item and frees the old block

### Amortised O(1)

- If resizing takes O(N) time, how can appending be O(1)?
- **The Insight:** The resize event is rare, and it gets exponentially rarer as the array grows. 
- If you insert 1025 elements, the 1025th insert forces a resize of 1024 elements (O(N)). But the *next* 1023 inserts will require absolutely zero resizing
- When you average out the cost of the single O(N) resize over the next N O(1) inserts, the average cost per insert drops to exactly 3 operations. This is called **Amortised O(1)**
