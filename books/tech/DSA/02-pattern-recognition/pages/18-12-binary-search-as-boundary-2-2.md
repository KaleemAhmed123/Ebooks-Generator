### Why this framing prevents off-by-one errors

- When you memorize `<` vs `<=`, `mid - 1` vs `mid + 1`, you will make mistakes under pressure
- When you think in boundaries, the logic writes itself:
  - Did this `mid` evaluate to True? Yes. Do I want a True? Yes. Then `mid` is a valid candidate. I cannot throw it away (`high = mid` or `low = mid`)
  - Did this `mid` evaluate to False? Yes. Is False the answer? No. Then I can throw it away safely (`low = mid + 1` or `high = mid - 1`)

:::interview
"Why did your binary search infinite loop?"

Because I used the standard floor midpoint calculation `(low + high) / 2` while trying to find the last True (`low = mid`). When `low` and `high` are adjacent, `mid` rounds down to `low`. Since it evaluated to True, I set `low = mid`, meaning nothing changed. To fix it, I must bias the midpoint up: `(low + high + 1) / 2`.
:::
