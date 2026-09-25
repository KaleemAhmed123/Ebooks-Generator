## Elimination worked problems <span class="lv lv2"></span>

### Problem 1: Daily Temperatures (1D elimination)

- **Problem:** Given an array of daily temperatures, return an array with the number of days you have to wait for a warmer temperature
- **Why it is an elimination problem:** You are looking for the "next greater element". A temperature of 75 permanently dominates a previous temperature of 70, because 75 answers 70's question. 70 is no longer unresolved

**Derivation:**
1. **Brute force:** For each day, scan forward until you find a warmer day. O(n²)
2. **What's repeated?** You are scanning past unresolved cool days multiple times
3. **Elimination pattern:** Maintain a stack of unresolved days (indices). When a new temperature arrives, if it is warmer than the stack top, it proves the top is dominated. Pop the top, calculate the distance (current day - popped day), and repeat

```ts
function dailyTemperatures(temps: number[]): number[] {
  const answer = new Array(temps.length).fill(0);
  const unresolved: number[] = []; // Stack of indices

  for (let i = 0; i < temps.length; i++) {
    // Current temp dominates the top of the stack?
    while (unresolved.length > 0 && temps[i] > temps[unresolved[unresolved.length - 1]]) {
      const dom = unresolved.pop()!;
      answer[dom] = i - dom;       // Distance to the warmer day
    }
    unresolved.push(i);
  }
  return answer;
}
```
