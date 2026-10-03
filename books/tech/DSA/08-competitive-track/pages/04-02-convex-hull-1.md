## Convex Hull (Graham Scan / Monotone Chain) <span class="lv lv3"></span>

Given a set of N points, the Convex Hull is the smallest convex polygon that encloses all the points. Imagine snapping a rubber band around the points; the shape the rubber band forms is the Convex Hull.

### The Algorithm: Monotone Chain

Monotone Chain is the preferred algorithm in competitive programming because it is easier to implement than Graham Scan and strictly requires O(N log N) time.

**The Strategy:**
1. Sort the points lexicographically (first by `x`, then by `y`).
2. The leftmost point and rightmost point are definitely part of the hull.
3. We build the **Upper Hull** and **Lower Hull** separately using a Monotonic Stack.
4. As we iterate left-to-right, we add points to the hull. If the last three points in the hull make a "Right Turn" (or are collinear), it violates convexity! We must pop the middle point. (We use the `orientation` function from the previous page).
