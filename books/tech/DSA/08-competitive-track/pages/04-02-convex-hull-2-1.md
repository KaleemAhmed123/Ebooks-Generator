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
