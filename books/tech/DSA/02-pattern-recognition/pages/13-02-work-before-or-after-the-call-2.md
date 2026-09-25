### Variations

- **Tree traversals (Chapter 14):** pre-order, in-order and post-order are exactly "pre", "in" and "post" with two children. Post-order is where a node sees its children's answers
- **Add 1 to a number represented as a linked list (GFG):** recurse to the tail; each frame, on the way *up*, adds the carry returned by its child and returns its own carry. No reversal needed
- **Delete middle element of a stack (GFG):** pop and hold the top on the way down, count depth; at depth `⌊n/2⌋` pop without holding; push the held values back on the way up
- **Print linked list in reverse:** recurse to the end, print on the way up
- **Reverse a stack / insert at bottom (page 13-01):** "pop now, push back after the call" is post-work

### The failure

- **Expecting a local change to survive the way up.** Frames do not share locals. If a deeper call needs to tell its caller something (a carry, a count), *return* it or pass a shared object; assigning to a local parameter changes only that frame
- **Recursion depth.** A linked list or path of 10⁵ nodes means 10⁵ nested frames; that can exceed the default stack in Node.js and many judges. When the input is a long chain, prefer the iterative version

:::interview
"What decides whether a line goes before or after the recursive call?" — Whether it needs the input in forward order or the result of the smaller problem. Work before the call runs top-down with nothing solved yet; work after it runs bottom-up with the smaller call's answer in hand. Tree post-order, carrying digits back up a list, and restoring state after backtracking are all "after the call".
:::
