## Boundary worked problems 🟡

### Problem 1: Koko Eating Bananas (Minimise the Maximum)

- **Problem:** Koko loves to eat bananas. There are N piles of bananas. She can eat K bananas per hour. Find the minimum integer K such that she can eat all the bananas within H hours
- **Why it is a boundary problem:** Minimise the capacity K. If she can eat them all at speed 5, she can definitely eat them at speed 6. The sequence is `[F, F, T, T, T]`. We want the first T

**Derivation:**
1. **Search Space:** `low = 1` (minimum possible eating speed), `high = max(piles)` (eating the largest pile in 1 hour)
2. **Condition:** `isPossible(K)` — for each pile, the hours taken is `Math.ceil(pile / K)`. Sum these up. If sum ≤ H, return True
3. **Boundary template:** First True

```ts
function minEatingSpeed(piles: number[], h: number): number {
  let low = 1;
  let high = Math.max(...piles);

  const isPossible = (k: number) => {
    let hours = 0;
    for (const pile of piles) {
      hours += Math.ceil(pile / k);
    }
    return hours <= h;
  };

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (isPossible(mid)) {
      high = mid;    // mid works, try to go slower
    } else {
      low = mid + 1; // mid failed, must go faster
    }
  }
  return low;
}
```

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

  while (low < high) {
    const mid = low + Math.floor((high - low + 1) / 2); // Bias UP!
    if (isPossible(mid)) {
      low = mid;      // mid works, try to push distance higher
    } else {
      high = mid - 1; // mid failed, distance is too large
    }
  }
  return low;
}
```

### The pattern across both

- Neither problem involves searching for an element in an array
- Both problems construct a monotonic boolean function
- Both rely entirely on transforming an optimization request into a yes/no question
- If it's a "Minimise" problem → First True template. If it's a "Maximise" problem → Last True template (bias up)
