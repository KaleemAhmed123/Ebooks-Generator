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
