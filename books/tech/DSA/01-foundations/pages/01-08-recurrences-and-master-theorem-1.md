## Recurrences and the Master Theorem <span class="lv lv2"></span>

- A recurrence relation describes a function in terms of its own smaller inputs. Divide-and-conquer algorithms (like Merge Sort or Binary Search) produce recurrences naturally
- The Master Theorem is a cookbook formula to instantly solve recurrences of the form T(n) = aT(n/b) + f(n)
- You do not need to draw recursion trees in interviews. You just need to know the formula and the three cases

### The components

- **a**: The number of recursive calls (how many branches you make). Must be ≥ 1
- **b**: The factor by which the input size shrinks. Must be > 1
- **f(n)**: The work done *outside* the recursive calls (e.g. dividing the array, or merging the results)
- **The watershed function**: nlogb a. Compare this against f(n) to find the answer
