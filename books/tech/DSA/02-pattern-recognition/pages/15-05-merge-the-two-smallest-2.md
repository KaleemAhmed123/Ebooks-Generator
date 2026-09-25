### Variations

- **Huffman Encoding (GFG):** the same loop builds a tree instead of a number: pop two nodes, create a parent with their total frequency, push it. Codes are the root-to-leaf paths (`0` left, `1` right). GFG breaks frequency ties by insertion order, so the heap must too
- **Last Stone Weight (LeetCode 1046):** the mirror image with a max-heap: smash the two heaviest, push back the difference if it is non-zero
- **Minimum Operations to Halve Array Sum (LeetCode 2208):** repeatedly halve the current largest value; a max-heap gives it in O(log n) each time
- **Game with String (GFG):** remove k characters to minimise the sum of squared frequencies. Decrement the largest frequency k times: shrinking the biggest count lowers the sum the most
- **Minimum sum of two numbers formed from digits (GFG):** no heap needed: sort the digits and deal them alternately to the two numbers, so large digits land in low positions of both

### The failure

- **Merging in sorted order once.** Sorting and merging left to right ignores that a merged rope must compete with the ropes still waiting. On `[2, 2, 3, 3]` left to right costs 4 + 7 + 10 = 21; the heap merges `2 + 2`, then `3 + 3`, then `4 + 6`, for 20
- **Merging the two largest.** Big ropes merged early are paid again in every later merge: `[1, 2, 3, 4]` costs 7 + 9 + 10 = 26 that way, against 3 + 6 + 10 = 19 from the two smallest

:::interview
"Why is merging the two smallest optimal?" — The total cost counts each original rope once for every merge above it, so the cost is the sum of length times depth in the merge tree. An exchange argument shows the two smallest ropes can always be placed as siblings at the deepest level without increasing the cost; merging them first and recursing on the rest gives the optimum. With a heap that is O(n log n).
:::
