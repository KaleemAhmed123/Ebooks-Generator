### Problem 2: Aggressive Cows (Maximise the Minimum)

- **Problem:** Place C cows in N stalls such that the minimum distance between any two of them is as large as possible
- **Why it is a boundary problem:** Maximise the minimum distance. If you can place them with a distance of 4 between them, you can definitely place them with a distance of 3. The sequence is `[T, T, T, F, F]`. We want the last T

**Derivation:**
1. **Search Space:** `low = 1`, `high = stalls[N-1] - stalls[0]` (max possible distance)
2. **Condition:** `isPossible(dist)` — place the first cow in the first stall. Then iterate. Only place the next cow if the current stall is ≥ previous cow's stall + dist. If we place all C cows, return True
3. **Boundary template:** Last True (requires biasing mid UP)

```ts
function maxDistance(stalls: number[], cows: number): number {
  stalls.sort((a, b) => a - b);
  let low = 1;
  let high = stalls[stalls.length - 1] - stalls[0];

  const isPossible = (dist: number) => {
    let count = 1;
    let lastPlaced = stalls[0];
    for (let i = 1; i < stalls.length; i++) {
      if (stalls[i] - lastPlaced >= dist) {
        count++;
        lastPlaced = stalls[i];
      }
    }
    return count >= cows;
  };
```
