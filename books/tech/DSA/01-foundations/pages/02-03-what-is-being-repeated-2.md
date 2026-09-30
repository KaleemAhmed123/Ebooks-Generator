### The trap

- **Failing to see hidden repetition.** Sometimes the repetition isn't obvious. If you sort an array, you do O(n log n) work once. If you scan an unsorted array to find the minimum, then scan again to find the second minimum, you are repeating the scanning work. Sorting the array *preprocesses* it so you never have to scan again

:::interview
"Why is your recursive Fibonacci solution so slow?"

Because it calculates `fib(3)` multiple times. `fib(5)` calls `fib(4)` and `fib(3)`. But `fib(4)` also calls `fib(3)`. The work is repeated exponentially. We need to remember `fib(3)` the first time we compute it.
:::
