### Implementation (C++)

```cpp
struct Point {
    long long x, y;
};

// Returns:
// 0 if p, q, r are collinear
// 1 if Clockwise (Right turn)
// 2 if Counter-Clockwise (Left turn)
int orientation(Point p, Point q, Point r) {
    long long val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    
    if (val == 0) return 0;  // Collinear
    return (val > 0) ? 1 : 2; // Clockwise or Counter-Clockwise
}
```

Notice that we only use `long long` multiplication and subtraction. No division. No floats. No `sin()` or `cos()`. This is 100% precise and extremely fast.

### Why it matters

This single `orientation` function is the building block for almost all geometry algorithms:
- Finding if two line segments intersect.
- Finding the Convex Hull.
- Checking if a point is inside a polygon.
