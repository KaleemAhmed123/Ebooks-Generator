## Flood From the Border <span class="lv lv2"></span>

- **What it is:** Invert the question. Instead of asking every region "are you enclosed?", flood inward from the border and mark everything it reaches as **safe**. Whatever the flood never touched is enclosed by definition
- **Signal:** "surrounded", "enclosed", "cannot walk off the grid", "closed island", "cells that can reach the edge / the ocean"
- **Why it works:** "Touches the border" is a property of a whole connected region. One flood per border cell settles it for every region at once, in O(m · n) total, with no per-region verdict to carry back up a recursion
