## Convex Hull (Graham Scan / Monotone Chain) 🔴

Given a set of N points, the Convex Hull is the smallest convex polygon that encloses all the points. Imagine snapping a rubber band around the points; the shape the rubber band forms is the Convex Hull.

### The Algorithm: Monotone Chain

Monotone Chain is the preferred algorithm in competitive programming because it is easier to implement than Graham Scan and strictly requires O(N log N) time.

**The Strategy:**
1. Sort the points lexicographically (first by `x`, then by `y`).
2. The leftmost point and rightmost point are definitely part of the hull.
3. We build the **Upper Hull** and **Lower Hull** separately using a Monotonic Stack.
4. As we iterate left-to-right, we add points to the hull. If the last three points in the hull make a "Right Turn" (or are collinear), it violates convexity! We must pop the middle point. (We use the `orientation` function from the previous page).

### Implementation (C++)

```cpp
bool compare(Point a, Point b) {
    if (a.x == b.x) return a.y < b.y;
    return a.x < b.x;
}

vector<Point> convexHull(vector<Point>& points) {
    int n = points.size();
    if (n <= 3) return points; // All points form the hull

    vector<Point> hull;
    sort(points.begin(), points.end(), compare);

    // Build Lower Hull
    for (int i = 0; i < n; i++) {
        // While the last two points and the new point don't make a CCW turn, pop!
        while (hull.size() >= 2 && 
               orientation(hull[hull.size()-2], hull.back(), points[i]) != 2) {
            hull.pop_back();
        }
        hull.push_back(points[i]);
    }

    // Build Upper Hull
    // Start from n-2 and go backwards. 
    // Remember the lower hull size to avoid popping the left-most anchor.
    int t = hull.size() + 1;
    for (int i = n - 2; i >= 0; i--) {
        while (hull.size() >= t && 
               orientation(hull[hull.size()-2], hull.back(), points[i]) != 2) {
            hull.pop_back();
        }
        hull.push_back(points[i]);
    }

    // The last point is the same as the first point. Remove it.
    hull.pop_back();
    return hull;
}
```

### When to use it
- "Find the minimum perimeter fence to enclose all trees."
- "Given points, find the maximum area triangle" (The vertices of the maximum triangle are guaranteed to be on the Convex Hull).
