## Orientation (The Cross Product) <span class="lv lv3"></span>

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
