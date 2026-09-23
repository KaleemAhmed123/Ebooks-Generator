## Orientation (The Cross Product) 🔴

Computational Geometry is infamous for floating-point inaccuracies. If you use `Math.atan2` to calculate angles, or `y = mx + b` with floats to check if points are collinear, your code will fail on edge cases.
The golden rule of Geometry in CP: **Keep everything in integers.**

### The Cross Product

Given three points p, q, and r, we want to know if taking the path p to q to r is a left turn, a right turn, or if they are collinear (a straight line).

We can determine this using the Cross Product of the two vectors vec{pq} and vec{qr}.

Let vec{pq} = (q.x - p.x, q.y - p.y) = (x₁, y₁)
Let vec{qr} = (r.x - q.x, r.y - q.y) = (x₂, y₂)

The 2D Cross Product is: C = x₁ times y₂ - y₁ times x₂

### The Orientation Rule

- If C > 0: The turn is **Counter-Clockwise** (Left turn).
- If C < 0: The turn is **Clockwise** (Right turn).
- If C == 0: The points are **Collinear**.

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
