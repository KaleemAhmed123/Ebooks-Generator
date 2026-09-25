### Variations

- **Majority Element II (LeetCode 229), count > ⌊n/3⌋:** at most two such values can exist, so keep two candidates and two counters. A value matching neither cancels one vote from *each*. Then a **second pass** must count both candidates, because survivors are only possible answers
- **General ⌊n/k⌋:** keep k − 1 candidates (the Misra–Gries summary); any value above n/k is among them, then verify with a second pass. O(n · k) time, O(k) space
- **"Find all elements that appear more than n/k times" (GFG) with no space limit:** a frequency map is simpler and is O(n) time, O(n) space. Use voting when the interviewer adds "O(1) space" or "stream"

### The failure

- **Skipping the verification pass when a majority is not guaranteed.** On `[1, 2, 3]` the vote leaves candidate 3 with count 1, yet nothing appears more than once. LeetCode 169 promises a majority, so no check is needed there; GFG's Majority Element and LeetCode 229 do not, and the second pass is required
- **Updating two candidates in the wrong order.** In the ⌊n/3⌋ version, check "matches candidate 1", then "matches candidate 2", *then* "a counter is zero". Checking for a zero counter first lets a value that is already candidate 1 grab the free slot 2 as well. On `[1, 1, 3, 4, 3]` the second 1 does exactly that, the 1s split their votes, and that order reports only `[3]`; the answer is `[1, 3]`

:::interview
"Why does a second pass not break the O(1) space claim?" — Because it only counts two fixed candidates, which needs two integers. Voting finds the only values that *could* be above the threshold; counting decides which of them actually are. Two passes, O(n) time, O(1) extra space.
:::
