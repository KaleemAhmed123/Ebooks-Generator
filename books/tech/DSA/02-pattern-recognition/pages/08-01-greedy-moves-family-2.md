### The moves in this chapter

| Page | Move | Why it is safe |
|---|---|---|
| **08-02 Extend the Reach** | jump to the next frontier, counting levels | stays ahead: greedy's reach after k jumps is maximal |
| **08-03 Take the Latest Free Slot** | best job first, into the latest slot before its deadline | exchange: an earlier slot is worth more to someone else |
| **08-04 Pair the Extremes** | sort, then match the largest with the smallest | exchange: crossing pairs never helps |
| **08-05 Sort by Regret** | sort by the cost of *not* getting your preference | exchange on neighbours with a derived key |
| **08-06 Restart When You Go Broke** | the first station that leaves you negative rules out every start before it | a prefix argument |

Sorting-based greedy (activity selection, sort by end) lives on 07-07 and Module 04 (03-04); heap-based greedy (merge the two smallest, take now and regret later) on 15-05 and 15-06.

### The trap

- **Trusting the first greedy that passes the samples.** The coin-change counterexample is Module 04 (03-01). Before coding, spend one minute trying to break the move on a tiny input
