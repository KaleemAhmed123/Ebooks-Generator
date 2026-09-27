# Chapter 8 - Greedy Moves

## Greedy <span class="lv lv2"></span>

- **What it is:** commit to the best-looking choice now and never revisit it. The loop is easy; knowing *which* choice is safe is the whole problem
- **Signal:** a minimum or maximum over choices made one at a time (jumps, boats, slots, starts), n up to 10⁵ so a DP over pairs is too slow, and one move that looks obviously best
- **Mechanism:** a safe move has a proof that some optimal answer agrees with it: an *exchange* (swap the greedy choice into any optimal answer without loss) or *stays ahead* (after each step greedy is at least as far along)

### The moves

| Move | When to use | Why it is safe |
|---|---|---|
| **08-02** | fewest jumps to cover a line | stays ahead: the reach is maximal |
| **08-06** | one start completes a circle | a failed stretch fails every start in it |
| **08-03** | unit jobs with deadlines | exchange: early slots are scarce |
| **08-04** | pair everyone, limit per pair | exchange: crossed pairs never help |
| **08-05** | two sides with quotas | one derived key prices each move |

Sort-by-end greedy is 07-07; heap greedy is 15-05 and 15-06.

### The trap: find a counter-input before coding

| Tempting move | Tiny counter-input | What beats it |
|---|---|---|
| largest coin first | `[1, 3, 4]`, amount 6: 4 + 1 + 1 | 3 + 3: DP, 17-02 |
| earliest start first | `[1, 100], [2, 3], [4, 5]`: keeps 1 | earliest end keeps 2 |
| earliest free slot | x (due 2, 100), y (due 1, 50): 100 | latest slot keeps both: 150 |
