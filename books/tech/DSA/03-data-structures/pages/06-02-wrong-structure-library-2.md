### 4. The Sorting-a-Heap Trap
- **The Mistake:** Storing an array, pushing elements, and then calling `arr.sort()` inside a loop to find the max.
- **The Reality:** Sorting takes $O(N \log N)$. Doing it $K$ times takes $O(K \times N \log N)$.
- **The Consequence:** TLE.
- **The Fix:** Use a Max-Heap. Pushing takes $O(\log N)$, peeking takes $O(1)$. Total time drops to $O(K \log N)$.

### 5. The Adjacency Matrix Trap
- **The Mistake:** Building a 2D matrix `adj[U][V]` to represent edges in a graph with $10^5$ nodes.
- **The Reality:** $10^5 \times 10^5 = 10^{10}$ integers. This is 40 Gigabytes of RAM.
- **The Consequence:** Immediate MLE.
- **The Fix:** Use an Adjacency List `adj[U] = [V1, V2]`. It only stores edges that actually exist, capping memory at $O(V + E)$.

### 6. The "Heap for Middle Removals" Trap
- **The Mistake:** Using a standard Priority Queue (Heap) for a Sliding Window Median problem, where elements fall out of the back of the window and must be deleted.
- **The Reality:** A Heap only provides $O(\log N)$ deletion for the *root*. Deleting an arbitrary element requires an $O(N)$ linear scan to find it.
- **The Consequence:** Your $O(\log N)$ algorithm degrades to $O(N)$ per step. TLE.
- **The Fix:** Use an Ordered Set (TreeSet), or use Lazy Deletion (keep a Hash Map of deleted elements and only pop them if they surface to the root).
