## Recognition drills: Prefix & Running State 🟢

Hide the right column. Name the summary you would carry through one pass, and whether you store a count, a first index, or a best value.

| Problem | Pattern & the summary |
|---|---|
| 1. Subarray with 0 sum (GFG) | **Equal prefixes.** A repeated prefix sum brackets a zero-sum subarray; a `Set` is enough |
| 2. Subarray Sums Divisible by K (LeetCode 974) | **Equal prefixes,** code = normalised `sum mod k`, store counts |
| 3. Continuous Subarray Sum (LeetCode 523) | **Equal prefixes,** first index per remainder, length ≥ 2 |
| 4. Longest subarray with equal odd and even elements (GFG) | **Equal prefixes,** code = running `+1 odd / −1 even`, first index |
| 5. Maximum length subarray with even sum (GFG) | **Parity observation.** Even total → n. Odd → drop the shorter of: prefix through the first odd element, or suffix from the last odd element |
| 6. Find the Longest Substring Containing Vowels in Even Counts (LeetCode 1371) | **Equal prefixes,** 5-bit parity mask, first index |
| 7. Best Time to Buy and Sell Stock (LeetCode 121) | **Best partner so far:** the cheapest price seen |
| 8. Best Sightseeing Pair (LeetCode 1014) | **Best partner so far:** split into `v[i] + i` and `v[j] − j` |
| 9. Maximum Index (GFG) | **Two passes:** prefix minimum and suffix maximum, then two pointers. The score is coupled, so a single best-so-far fails |
| 10. Equilibrium Point (GFG) | **Running sum:** right side = `total − left − a[i]` |
| 11. Product of Array Except Self (LeetCode 238) | **Two passes:** product before `i`, product after `i` |
