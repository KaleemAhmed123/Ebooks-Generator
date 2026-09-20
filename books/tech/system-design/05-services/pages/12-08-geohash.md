## Geohash

- A Geohash is a mathematical trick (a Z-order curve) that converts a 2D coordinate (Latitude, Longitude) into a 1D string of letters and numbers (e.g., `dr5rug`)
- Because it is just a 1D string, you can store it in a standard Redis database, or put a standard B-tree index on it. The magic of Geohash is that points that are close to each other on Earth will usually have the same prefix

| Geohash Length | Cell Size (Accuracy) | Example |
|---|---|---|
| **4 characters** | ~39 kilometers | `dr5r` (A city) |
| **5 characters** | ~4.9 kilometers | `dr5ru` (A neighborhood) |
| **6 characters** | ~1.2 kilometers | `dr5rug` (A few blocks) |
| **7 characters** | ~153 meters | `dr5rug3` (A large building) |

- If you want to find drivers within 5 kilometers of the user (`dr5ru`), you simply query the database for `SELECT * FROM drivers WHERE geohash LIKE 'dr5ru%'`. The B-tree instantly finds them

### The failure

- The failure is the edge case boundary. Because the Earth is mapped onto a grid, two people might be standing exactly 1 meter apart, but if they are standing on the border line between two large grid squares, their Geohashes will be completely different
- User A is in `dr5` and User B is in `dq9`. A simple prefix search (`LIKE 'dr5%'`) will completely miss User B, even though they are 1 meter away. To fix this, a production search must check the user's Geohash *and* the 8 immediately surrounding grid squares
