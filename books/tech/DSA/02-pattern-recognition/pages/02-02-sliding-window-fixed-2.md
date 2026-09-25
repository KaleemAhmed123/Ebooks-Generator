### Variations

- **Maximum Number of Vowels in a Substring of Given Length (LeetCode 1456):** the summary is a count of vowels; add 1 on enter, subtract 1 on leave
- **Find All Anagrams in a String (LeetCode 438):** the summary is a 26-letter count map; a window matches when it equals p's map (the same map is worked for LeetCode 567 in Module 03, 02-03)
- **First negative integer in every window of size k (GFG):** keep a queue of indices of negatives; drop the front once it falls out of the window
- **K Radius Subarray Averages (LeetCode 2090):** a window of 2k + 1 centred on i; windows that would cross an edge answer −1
- **Maximum of every window (LeetCode 239):** a max cannot be undone, so the summary becomes a monotonic deque (10-10)

### The failure

- **Starting `best` at 0.** With all-negative input the true best window is negative: `[−1, −2]` with k = 1 should give −1, but `best = 0` returns 0. Start from the first window, as above

:::interview
"When is a running sum not enough for a fixed window?" — When the summary cannot undo the leaving element. Sums, counts and letter maps subtract cleanly, so each step is O(1). A maximum or minimum cannot forget an element, so I keep a monotonic deque of candidates instead; still O(n) overall.
:::
