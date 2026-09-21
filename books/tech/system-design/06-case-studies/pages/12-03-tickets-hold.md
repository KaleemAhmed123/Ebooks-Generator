## Holding a seat

- A hold is a conditional write on the seat's row with an expiry. Two ways, and the interviewer wants both named: a row lock in Postgres, below, or a Redis key with a TTL, `SET hold:{event}:{seat} {user} NX EX 600`, one atomic command that expires by itself

```typescript
async function hold(tx: Tx, ev: number, seat: string, user: number) {
  const s = await tx.one("SELECT status, hold_expires FROM seats " +
    "WHERE event_id=$1 AND seat_id=$2 FOR UPDATE NOWAIT", [ev, seat]);
  const free = s.status === "available" ||
    (s.status === "held" && s.hold_expires < new Date());   // an expired hold is free
  if (!free) return false;
  await tx.run("UPDATE seats SET status='held', held_by=$3, hold_expires=$4 " +
    "WHERE event_id=$1 AND seat_id=$2",
    [ev, seat, user, new Date(Date.now() + 600_000)]);   // 10 min
  return true;
}
```

- `FOR UPDATE NOWAIT` is the Postgres form of "one buyer at a time, nobody waits": the docs say `NOWAIT` errors instead of waiting for a locked row. The loser sees "taken" in a millisecond, which at 10-to-1 is what 90 % see (page 1). Booklet 03 owns the lock; page 6 has the sweeper

:::interview
"Two people click the same seat in the same second. How do you stop both buying it?" — The hold is a conditional write on that seat's row: lock it, check it is free or its hold has expired, mark it held with an expiry, in one transaction, so the second click finds it held and is told so at once. Then the half they wait for: the TTL frees a seat whose buyer closed the tab, and it is longer than the payment step (page 6).
:::

### The failure

- A hold in the application server's memory. The pod restarts or scales down and every buyer mid-checkout loses their seat, or two pods hold the same seat because neither knows the other. The hold lives where the seat lives
