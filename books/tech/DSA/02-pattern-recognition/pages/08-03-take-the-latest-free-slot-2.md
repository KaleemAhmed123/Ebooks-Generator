### Variations

- **Faster slot search:** the inner loop is O(maxD) per job. A union-find over slots, where `parent[t]` points to the latest free slot at or before `t`, makes each lookup nearly O(1)
- **Same problem, other engine:** the regret heap of 15-06 gives the same total
- **Course Schedule III (LeetCode 630):** jobs have *lengths*, not unit time. The slot trick no longer applies; the regret heap does (page 15-06)
- **Maximum Profit in Job Scheduling (LeetCode 1235):** jobs are weighted *intervals*, not unit tasks with deadlines. Greedy fails; it is DP with binary search (Chapter 17)

### The failure

- **Earliest free slot.** Put a job in the first free slot and a loose job steals a slot a tight job needed. Jobs `x (deadline 2, profit 100)` and `y (deadline 1, profit 50)`: earliest-slot puts `x` in slot 1 and loses `y`; latest-slot puts `x` in slot 2 and keeps both, 150
- **Sorting by deadline alone.** Early deadlines first ignores profit: a worthless job with deadline 1 takes the only slot a valuable deadline-1 job needed

:::interview
"Why place each job as late as possible?" — The jobs are processed in profit order, so every job already placed is at least as valuable as the ones still to come. A job's deadline says it may use any slot up to `d`; using the latest one takes away the fewest options from the remaining jobs, whose deadlines might be earlier. An exchange argument turns any optimal schedule into this one without lowering profit.
:::
