### Variations

- **Remove All Adjacent Duplicates In String (LeetCode 1047):** push a character; if it equals the top, pop instead. The stack *is* the answer, read bottom to top
- **Remove All Adjacent Duplicates in String II (LeetCode 1209) / Restrictive Candy Crush (GFG):** push `(char, runLength)`; when a run reaches k, pop it. Removing k equal characters is one pop, however long the cascade
- **Backspace String Compare (LeetCode 844):** `#` pops. For O(1) space, walk both strings from the end and skip characters owed to pending backspaces
- **Make The String Great (LeetCode 1544):** a letter cancels the top when they are the same letter in opposite case
- **Recursively remove all adjacent duplicates (GFG) — the trap:** here removal happens in *rounds*: every run of length ≥ 2 disappears at once, then the result is scanned again. That is not the stack's cascade. On `"babbaa"` rounds give `"ba"` (both runs vanish together), while a stack that deletes each run and lets its neighbours merge at once gives `"b"`. Check which rule your statement uses before reaching for a stack; rounds need a linear pass per round

### The failure

- **Repeating `replace` until nothing changes.** `while (s.includes("aa")) s = s.replace(...)` rescans the whole string after every removal: O(n²), and slower still in languages that copy strings on every edit
- **Pushing the newcomer before it has finished fighting.** In the asteroid loop, `[10, 2, −5]` must end as `[10]`; checking only one pop leaves `[10, −5]`, a pair that is still colliding

:::interview
"Why is the asteroid loop O(n) with a `while` inside a `for`?" — Every asteroid is pushed at most once and popped at most once. The inner loop only runs while it pops, or once more to end the fight. So the total work across the whole array is at most 2n pushes and pops plus n loop exits.
:::
