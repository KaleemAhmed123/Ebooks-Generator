## Two Pointers: Reader and Writer <span class="lv lv1"></span>

- **What it is:** Both pointers move left to right. The **reader** visits every element once; the **writer** marks where the next kept element goes. With three regions to build (smaller, equal, larger), a third pointer works from the back: the **Dutch National Flag** partition
- **Signal:** "in place", "O(1) extra space", "remove / move / keep elements and return the new length", "sort an array of 0s, 1s and 2s"
- **Why it works:** Everything left of the writer is final, and the writer never passes the reader, so no unread value is overwritten. In the three-way version, every index is in one of four zones: settled low, settled middle, unknown, settled high. Each step shrinks the unknown zone by one

:::mint
<svg viewBox="0 0 470 130" role="img" aria-label="Dutch national flag partition. An array split into four zones: zeros before low, ones from low to mid, unknown from mid to high, twos after high. Seeing 0 at mid: swap with low, advance both. Seeing 1: advance mid. Seeing 2: swap with high, move high back, and do not advance mid because the swapped-in value is still unknown." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .z0 { fill: #ffedf1; stroke: #ef476e; stroke-width: 1; }
    .z1 { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .zu { fill: #f3f3f3; stroke: #9a9a9a; stroke-width: 1; stroke-dasharray: 3 2; }
    .z2 { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1; }
    .p { font: bold 9px Consolas, monospace; fill: #2d6a4f; }
  </style>
  <defs><marker id="m0209" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#2d6a4f"/></marker></defs>
  <rect class="z0" x="30" y="30" width="90" height="26"/><text x="75" y="47" class="lb" text-anchor="middle">0 0 0</text>
  <rect class="z1" x="120" y="30" width="90" height="26"/><text x="165" y="47" class="lb" text-anchor="middle">1 1 1</text>
  <rect class="zu" x="210" y="30" width="140" height="26"/><text x="280" y="47" class="lb" text-anchor="middle">? ? ? ? ?</text>
  <rect class="z2" x="350" y="30" width="90" height="26"/><text x="395" y="47" class="lb" text-anchor="middle">2 2 2</text>
  <text x="120" y="22" class="p" text-anchor="middle">low</text><line x1="120" y1="24" x2="120" y2="30" stroke="#2d6a4f" stroke-width="1.2"/>
  <text x="210" y="22" class="p" text-anchor="middle">mid</text><line x1="210" y1="24" x2="210" y2="30" stroke="#2d6a4f" stroke-width="1.2"/>
  <text x="350" y="22" class="p" text-anchor="middle">high</text><line x1="350" y1="24" x2="350" y2="30" stroke="#2d6a4f" stroke-width="1.2"/>
  <text x="30" y="80" class="lb">a[mid] = 0</text><text x="110" y="80" class="sm">swap with low, low++, mid++</text>
  <text x="30" y="96" class="lb">a[mid] = 1</text><text x="110" y="96" class="sm">mid++</text>
  <text x="30" y="112" class="lb">a[mid] = 2</text><text x="110" y="112" class="sm">swap with high, high−− · mid stays: the value that came back is unknown</text>
  <path d="M215 64 C 240 72, 320 72, 345 64" fill="none" stroke="#2d6a4f" stroke-width="1" marker-end="url(#m0209)"/>
  <text x="280" y="126" class="sm" text-anchor="middle">loop ends when mid passes high: no unknown left</text>
</svg>
:::

```ts
// Sort Colors (LeetCode 75): one pass, O(1) space
function sortColors(nums: number[]): void {
  let low = 0, mid = 0, high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]]; low++; mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]]; high--;
    }
  }
}
```
