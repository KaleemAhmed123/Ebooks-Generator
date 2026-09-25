### The failure

- **Updating in one pass without encoding.** A cell set to "alive" is counted as a live neighbour by the cells after it. On a blinker (three live cells in a row) the in-place naive update does not produce the vertical bar the rules require
- **Clearing row 0 first in Set Matrix Zeroes.** If row 0 holds a zero, zeroing it early erases the markers for every column, and the whole matrix ends up zero. Markers are the last thing you overwrite

:::interview
"Can you do Game of Life without a second grid?" — Yes. The cell values are only 0 or 1, so the upper bits are free. I write the next state into bit 1 while every neighbour count reads bit 0, then one pass shifts right. Time O(m·n), extra space O(1). If the board were infinite, I would switch to a set of live coordinates instead.
:::
