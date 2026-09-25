### The trap: Applying the lazy value correctly

- The most common bug in Lazy Propagation is applying the lazy value incorrectly to the `tree` array
- If the tree tracks **Range Maximum**, and you add 5 to the range, the new maximum is `oldMaximum + 5`
- If the tree tracks **Range Sum**, and you add 5 to the range, the new sum is `oldSum + (5 * numberOfElementsInRange)`
- You must factor in the length of the segment when the operation dictates it

:::interview
"Why does Lazy Propagation keep updates at O(log N)?"

Because we stop traversing the tree as soon as we find a node completely contained within the update range. Instead of updating the O(N) leaves below it, we just tag that single node with a lazy marker and return. We only propagate that marker downwards later, on-demand, if a future query actually forces us to visit those children.
:::
