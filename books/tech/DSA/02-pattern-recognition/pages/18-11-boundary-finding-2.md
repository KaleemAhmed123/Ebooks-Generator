### The meta-skill: Inventing the condition

- The hardest part of these problems is never the binary search template. It is defining the `isPossible(x)` function
- **If the problem asks for a minimum:** Define `isPossible(x)` as "Can we achieve the goal with capacity x?" The pattern is `[F, F, T, T, T]`. You want the first T
- **If the problem asks for a maximum:** Define `isPossible(x)` as "Can we achieve the goal with size x?" The pattern is `[T, T, T, F, F]`. You want the last T

:::interview
"I don't know how to optimize this min-max problem."

Min-max and max-min problems are almost always boundary problems in disguise. Instead of asking "What is the maximum minimum?", ask: "Can I guarantee a minimum of X?" If yes, try X+1. If no, try X-1. You have transformed an optimization problem into a boolean boundary.
:::
