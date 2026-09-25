## Recognition drills: DP & Games 🟡 - continued

| Problem | Signature · transition |
|---|---|
| 54. Number of Music Playlists (LeetCode 920) | **`f(len, distinct)`:** new song `(n − j + 1)` ways, replay `max(j − k, 0)` ways |
| 55. Count All Possible Routes (LeetCode 1575) | **`f(city, fuel)`** |
| 56. Largest Independent Set (GFG) | **Tree DP,** take or skip each node (Module 06, 04-01) |
| 57. Count of Integers (LeetCode 2719) | **Digit DP:** `count(≤ num2) − count(≤ num1 − 1)` (Module 06, 05-03) |
| 58. Buy and sell at most twice / k times (GFG / LeetCode 188) | **Track what you hold** (17-04) |
| 59. Optimal Strategy for a Game (GFG) / Predict the Winner (LeetCode 486) / Coin game with three choices (GFG) | **Assume the opponent is perfect** (17-06) |

### Score yourself

- **50–59:** you can name the signature from the statement alone
- **35–49:** reread 17-02; most misses pick a table before a signature
- **0–34:** redo drills 1–20; each is `f(i)` or `f(i, budget)`
