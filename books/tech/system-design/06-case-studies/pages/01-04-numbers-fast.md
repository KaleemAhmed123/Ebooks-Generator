## Do the numbers in two minutes

- Once you know the constraints, you must do a quick back-of-the-envelope estimation. You need three numbers: throughput (QPS), storage capacity, and network bandwidth
- You only need rough estimates. 1 million requests a day is roughly 12 queries per second (QPS). To calculate this instantly, divide by 100,000 instead of 86,400. Remember that peak traffic is usually 3 to 5 times the average traffic
- If you have 10 million DAU, and each user does 5 actions a day, that is 50 million actions a day. 50 million divided by 100,000 is 500 average QPS (2,500 peak). You now know you do not need a massive microservice cluster
- Calculate storage by multiplying the daily writes by the average size of a row, then multiply by the retention period. Convert bytes to gigabytes using powers of 2

```typescript
function estimateScale(dau: number, actionsPerUser: number): void {
  const dailyActions = dau * actionsPerUser;
  // Divide by 100,000 for quick math instead of 86,400
  const averageQps = Math.ceil(dailyActions / 100_000);
  console.log(`Average QPS: ${averageQps} | Peak QPS: ${averageQps * 5}`);
}
// 10M DAU x 5 actions = 50M/day -> 500 avg QPS -> 2,500 peak
```

### The failure

- The failure mode is attempting to calculate numbers to three significant figures on a whiteboard, getting flustered, and wasting 10 minutes of the interview
- Interviewers do not care about the exact math. They care about the order of magnitude. A system designed for 100 QPS looks entirely different from a system designed for 100,000 QPS

:::interview
**The pragmatic math test**
Rounding 86,400 seconds to 100,000 shows you know how to operate pragmatically under pressure. Precision is the enemy of progress in the first 5 minutes.
:::
