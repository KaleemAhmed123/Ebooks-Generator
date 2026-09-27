### The moves in this chapter

| Pattern | Page | Move | Why it is safe |
|---|---|---|---|
| **18 · Reach and Restart** | **08-02 Extend the Reach** | jump to the next frontier, counting levels | stays ahead: reach after k jumps is maximal |
| | **08-06 Restart When You Go Broke** | the first station that leaves the tank negative rules out every start before it | a prefix argument |
| **19 · Latest Free Slot** | **08-03** | best job first, into the latest slot before its deadline | exchange: an earlier slot is worth more to someone else |
| **20 · Sort, then Assign** | **08-04 Pair the Extremes** | sort, then match the largest with the smallest | exchange: crossing pairs never helps |
| | **08-05 Price the Swap** | sort by what moving an item to the other side costs | one line of algebra on a derived key |

Sorting-based greedy (activity selection, sort by end) lives on 07-07 and Module 04 (03-04); heap-based greedy (merge the two smallest, take now and regret later) on 15-05 and 15-06.

### Break it before coding it

| Tempting move | Tiny counter-input | What beats it |
|---|---|---|
| largest coin first | coins `[1, 3, 4]`, amount 6: `4 + 1 + 1`, 3 coins | `3 + 3`, 2 coins: DP (17-02) |
| earliest start first, to keep the most intervals | `[1, 100], [2, 3], [4, 5]`: keeps 1 | earliest end keeps 2 (07-07) |
| earliest free slot for each job | x (deadline 2, profit 100), y (deadline 1, profit 50): x takes slot 1, total 100 | latest free slot keeps both, 150 (08-03) |
| each person to their cheaper city until it fills | `[40, 30], [80, 40], [80, 40], [40, 40]`, two per city: 190 | sort by `costA − costB`: 160 (08-05) |

Each counter-input has at most four items. If a minute of trying finds none, prove the move (Module 04, 03-01) and code it.
