### The trap

- **Trusting the recursive leap without defining the base case first.** Write the base case before anything else. A missing or wrong base case causes infinite recursion, which burns the entire stack and crashes
- The inductive step is usually obvious. The base case is where mistakes hide

:::interview
"Is recursion always slower than iteration?"

Not inherently. Both execute the same operations. Recursion adds stack-frame overhead (allocation, push, pop), which matters when depth is large. Any recursion can be rewritten iteratively with an explicit stack — do this when depth exceeds ~10⁴ or when constant factors matter.
:::
