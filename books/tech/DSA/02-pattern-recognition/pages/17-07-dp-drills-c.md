## Recognition drills: DP & Games <span class="lv lv2"></span> - continued

| Problem | Signature · transition |
|---|---|
| 26. Cherry Pickup (LeetCode 741) | **Two walkers at once:** `(r1, c1, r2)`, with `c2 = r1 + c1 − r2` |
| 27. Maximum sum rectangle (GFG) | **Fix a pair of rows, Kadane on column sums,** O(n²m) |
| 28. Largest zero-sum / equal 0-and-1 rectangle (GFG) | **Fix a pair of rows,** then equal prefixes on column sums (03-03) |
| 29. Longest Increasing Subsequence (LeetCode 300) | **`f(i)` or patience sorting** (Module 06, 02-04) |
| 30. Maximum Sum Increasing Subsequence (GFG) | **LIS adding values** instead of 1 |
| 31. Longest alternating subsequence (GFG) / Wiggle Subsequence (LeetCode 376) | **Two states:** last move up, last move down |
| 32. Maximum Alternating Subsequence Sum (LeetCode 1911) | **Two states:** next element is added, or subtracted |
| 33. Longest subsequence with adjacent difference one (GFG) | **`best[v] = 1 + max(best[v−1], best[v+1])`** |
| 34. Longest Arithmetic Subsequence of Given Difference (LeetCode 1218) | **`best[v] = best[v − d] + 1`** |
| 35. Longest Arithmetic Subsequence (LeetCode 1027) | **`dp[i]` = map diff → length** ending at i |
| 36. Maximum Length Chain of Pairs (GFG / LeetCode 646) | **Greedy by end;** weights make it 17-03 |
| 37. Maximum Number of Events That Can Be Attended II (LeetCode 1751) / Weighted Job Scheduling (GFG) | **Pick, then jump** (17-03) |
| 38. Minimum Difficulty of a Job Schedule (LeetCode 1335) | **`f(i, days)`:** try the day's last job j, cost `max(a[i..j])` |
| 39. Minimum removals so that max − min ≤ K (GFG) | **Not DP:** sort, keep the longest window, remove the rest (02-07) |
