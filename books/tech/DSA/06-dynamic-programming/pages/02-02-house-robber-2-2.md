### House Robber II (Circular Street)

- **The Twist:** The houses are arranged in a circle. House 0 is adjacent to House N-1.
- **The Trap:** If you rob House 0, you cannot rob House N-1. If you don't rob House 0, you *can* rob House N-1. You cannot track this in a standard 1D array without expanding the state to 2D (which makes it slow).
- **The Solution:** Break the circle into two separate, standard House Robber problems.
  1. Run the algorithm from House 0 to N-2 (ignoring the last house).
  2. Run the algorithm from House 1 to N-1 (ignoring the first house).
  3. Return the maximum of the two results.
