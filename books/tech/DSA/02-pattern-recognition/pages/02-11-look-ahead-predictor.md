# The "Look Ahead" Predictor

## The Mental Model
Checking the `i+1` or `i+2` state before committing to a move. This covers your `lookAhead` tag.

## Algorithm Derivation
**Brute force:** Make a move, check if it's valid, and if not, backtrack.
**↓**
**Why is it too slow?** $O(2^N)$ or $O(N!)$ because you explore dead ends deeply before realizing they are invalid.
**↓**
**What is being repeated?** The process of stepping into a bad state and unwinding it.
**↓**
**Can we eliminate candidates?** Yes. Look one step ahead.
**↓**
**Optimized Idea:** Only commit to a state transition if `arr[i+1]` satisfies the safe condition. This turns recursion into a simple $O(N)$ Greedy choice.

## Canonical Example: Jump Game
Instead of trying every jump, look ahead to see which jump gives the maximum *reach* (`i + nums[i]`) on the *next* turn.
