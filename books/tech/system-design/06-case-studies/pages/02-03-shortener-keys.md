## Key generation

- Seven base-62 characters (`a–z A–Z 0–9`) hold 62⁷ ≈ 3.5 × 10¹² codes. The question is how to hand them out without two writers picking the same one, at 40 a second, from several service instances

| Approach | How | Unique by | Cost |
| :--- | :--- | :--- | :--- |
| hash and truncate | first 7 chars of `MD5(url)` in base-62 | nothing: 41.7 bits of hash | birthday bound ≈ 2.3 M rows to the first collision, one day of writes; then check-and-rehash on every insert |
| counter, encoded | a sequence number written in base-62 | the sequence | codes are guessable and count the business; needs a coordinator |
| range allocation | each instance leases a block of 1 M numbers from a small coordinator, hands them out locally | the block lease | codes still sequential within a block; a crashed instance burns its block |
| pre-generated table | an offline job fills a table with random unused codes; the write path pops one | the pop is a row delete | one more store; the pop must be atomic across instances |

- **Base-62** is a change of number base, nothing more: `0 → "a"`, `61 → "9"`, `62 → "ba"`. Any integer under 3.5 × 10¹² fits in 7 characters
- A 64-bit Snowflake id (41 bits of milliseconds, 10 of machine, 12 of sequence; booklet 05) does not: 2⁶⁴ needs 11 base-62 characters. Time-ordered ids buy nothing here anyway; a code is never range-scanned. So "counter" means a plain sequence with range allocation, not a Snowflake id
- Guessability is fixed by encoding a random permutation of the sequence, or by picking the pre-generated table. Say which, and why: the requirements did not ask for unguessable codes, but abuse (page 5) will

### The failure

- Truncated hash with no collision plan. "MD5 and take seven characters" sounds deterministic and free. The pigeonhole principle makes collisions certain, and the birthday bound makes them early: with 2.3 M rows the first pair has already landed. The write path then needs a read-before-write on every insert, which is the check the counter approach was chosen to avoid
