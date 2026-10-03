### The "Record and Move" Principle

But wait, if we aggressively exclude `mid`, what if `mid` was actually the correct answer?
That's why we use the `ans` variable. 
When we find a valid `mid`, we **record it** (`ans = mid`). Once it is safely recorded, we can aggressively discard it from the search space (`right = mid - 1`) because we already have it saved! We are now free to see if an *even better* answer exists.

### Finding First vs Last Occurrence

- **Find First Occurrence:**
  If `arr[mid] >= target`, record `ans = mid`, and search left: `right = mid - 1`.
- **Find Last Occurrence:**
  If `arr[mid] <= target`, record `ans = mid`, and search right: `left = mid + 1`.

This single template perfectly handles both scenarios without needing to memorize bizarre `<` vs `<=` or `mid = Math.ceil(...)` rules.
