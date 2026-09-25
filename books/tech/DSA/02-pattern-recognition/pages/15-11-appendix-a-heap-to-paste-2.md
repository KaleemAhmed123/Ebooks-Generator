### The failure

- **`Array.sort` after every push.** Even on nearly sorted input, re-sorting costs at least linear time per insert, so 10⁵ inserts do about 5·10⁹ element moves. The sift loops above cost O(log n) each
