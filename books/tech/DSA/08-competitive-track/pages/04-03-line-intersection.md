## Line Segment Intersection 🔴

Given two line segments, p₁q₁ and p₂q₂, do they intersect?
Again, we **do not** use line equations (y = mx + b). Vertical lines cause division by zero, and floats cause inaccuracies. We use the `orientation` function.

### The General Case

Two segments intersect if and only if:
1. p₁, q₁, p₂ and p₁, q₁, q₂ have **different orientations**. (Meaning p₂ and q₂ are on opposite sides of the line p₁q₁).
2. AND p₂, q₂, p₁ and p₂, q₂, q₁ have **different orientations**. (Meaning p₁ and q₁ are on opposite sides of the line p₂q₂).

### The Collinear Case (The Trap)

If all four points are collinear (orientation is 0), the lines are lying on top of each other. But do they actually overlap? 
They only intersect if the x-projections and y-projections overlap. We need a helper function to check if a point lies on a segment.

```cpp
// Given that p, q, r are collinear, does point q lie on segment pr?
bool onSegment(Point p, Point q, Point r) {
    if (q.x <= max(p.x, r.x) && q.x >= min(p.x, r.x) &&
        q.y <= max(p.y, r.y) && q.y >= min(p.y, r.y))
       return true;
    return false;
}

// The master intersection function
bool doIntersect(Point p1, Point q1, Point p2, Point q2) {
    int o1 = orientation(p1, q1, p2);
    int o2 = orientation(p1, q1, q2);
    int o3 = orientation(p2, q2, p1);
    int o4 = orientation(p2, q2, q1);

    // General case
    if (o1 != o2 && o3 != o4) return true;

    // Special Cases (Collinear)
    // p1, q1 and p2 are collinear and p2 lies on segment p1q1
    if (o1 == 0 && onSegment(p1, p2, q1)) return true;
    if (o2 == 0 && onSegment(p1, q2, q1)) return true;
    if (o3 == 0 && onSegment(p2, p1, q2)) return true;
    if (o4 == 0 && onSegment(p2, q1, q2)) return true;

    return false; // Doesn't fall in any of the above cases
}
```

### Point in Polygon

You can use segment intersection to determine if a point is inside an arbitrary polygon.
Cast a ray (a horizontal segment) from the point to x = infty. 
Count how many polygon edges this ray intersects. 
- If the count is **Odd**, the point is Inside.
- If the count is **Even**, the point is Outside.
