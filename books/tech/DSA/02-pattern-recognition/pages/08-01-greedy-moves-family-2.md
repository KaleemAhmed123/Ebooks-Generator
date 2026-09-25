### The moves in this chapter

| Page | Move | Why it is safe |
|---|---|---|
| **08-02 Extend the Reach** | jump to the next frontier, counting levels | stays ahead: greedy's reach after k jumps is maximal |
| **08-03 Take the Latest Free Slot** | best job first, into the latest slot before its deadline | exchange: an earlier slot is worth more to someone else |
| **08-04 Pair the Extremes** | sort, then match the largest with the smallest | exchange: crossing pairs never helps |
| **08-05 Sort by Regret** | sort by the cost of *not* getting your preference | exchange on neighbours with a derived key |
| **08-06 Restart When You Go Broke** | the first station that leaves you negative rules out every start before it | a prefix argument |
| **08-07 Find the Invariant** | stop simulating; find what every operation preserves | algebra, parity, divisor counts |

Sorting-based greedy (activity selection, sort by end) lives on pages 07-03 and 07-07; heap-based greedy (merge the two smallest, take now and regret later) on 15-05 and 15-06.

### The trap

- **Trusting the first greedy that passes the samples.** Coin change with coins `{1, 3, 4}` and target 6: "largest coin first" gives 4 + 1 + 1 (three coins), the answer is 3 + 3 (two). Before coding, spend one minute trying to break the move on a tiny input
