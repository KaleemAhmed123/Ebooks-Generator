### The failure

- **Setting `random` in the first pass.** `x.random` may point to a node whose copy does not exist yet. Either finish all copies first, or use a map that creates copies on demand
- **Not restoring the original list.** Skipping the `x.next = copy.next` line leaves the caller's list woven with copies. Every test that checks "the original must be unchanged" fails

:::interview
"Can you copy a list with random pointers without a hash map?" — Yes: weave each copy directly after its original, so the copy of any node x is x.next. Then every copy's random pointer is `x.random.next`, and a final pass separates the two lists, restoring the original. Three linear passes, O(1) extra space besides the copies themselves.
:::
