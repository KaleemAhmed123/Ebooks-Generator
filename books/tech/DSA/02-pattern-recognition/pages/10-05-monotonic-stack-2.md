### The failure

- **Popping on `>=` when the question says "greater".** Equal values pop each other: on `[2, 2]` the first 2 gets 2 as its "next greater" instead of −1. Match the comparison to the word in the statement

:::interview
"How do you choose the stack's order?" — For next greater, keep the stack decreasing so an arrival pops everything smaller. For next smaller, keep it increasing. For *previous* greater or smaller, read the top after popping instead of at the pop.
:::
