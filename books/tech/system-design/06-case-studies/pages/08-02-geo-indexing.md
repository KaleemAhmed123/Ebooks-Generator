## Geo indexing choices

- "Nearby" needs the plane cut into cells, so a query touches a few cells and not every row. Three cuts get asked about, and the questions are always the same: what happens at a cell's edge, and how does the cell size follow density

| Index | Cell | Neighbours | Strength | Weakness |
| :--- | :--- | :--- | :--- | :--- |
| geohash | a base-32 string; each extra character splits the cell 32 ways | eight, by arithmetic on the string | a prefix is a box, so a plain B-tree prefix scan works | cells are lat/lng rectangles, not equal in area; two points a metre apart can share no prefix across an edge |
| quadtree | a square split in four until a leaf holds few enough points | walk the tree | adapts to density: one leaf for an ocean, thousands for a city | every move is a tree update; rebalancing under 250 000 writes/s |
| H3 (Uber) | a hexagon; 16 resolutions, 0 to 15, each finer cell ≈ 1/7 the area | six, all at one centre-to-centre distance | a radius is a ring count, not a box search | 122 base cells, 12 of them pentagons, placed over water |

<svg viewBox="0 0 460 112" role="img" aria-label="Left: a geohash grid of six rectangles, prefixes A to F. A user dot sits at the right edge of cell B and a cafe star sits just across the edge in cell C: a metre apart, no shared prefix. Right: an H3 hexagon with its six neighbours, every neighbour centre at the same distance d, so a radius is a count of rings. Caption: 16 resolutions, each finer cell about one seventh the area." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <g fill="#fff" stroke="#333">
    <rect x="30" y="14" width="46" height="30"/><rect x="76" y="14" width="46" height="30"/><rect x="122" y="14" width="46" height="30"/>
    <rect x="30" y="44" width="46" height="30"/><rect x="76" y="44" width="46" height="30"/><rect x="122" y="44" width="46" height="30"/>
  </g>
  <g font-size="7" text-anchor="middle"><text x="53" y="24">A</text><text x="99" y="24">B</text><text x="145" y="24">C</text><text x="53" y="54">D</text><text x="99" y="54">E</text><text x="145" y="54">F</text></g>
  <circle cx="119" cy="36" r="2.5" fill="#1d4e89"/><text x="114" y="31" text-anchor="end" font-size="7" fill="#1d4e89">user</text>
  <text x="125" y="39" font-size="8" fill="#bf4c28">✦</text><text x="133" y="40" font-size="7" fill="#bf4c28">café</text>
  <text x="99" y="90" text-anchor="middle" font-size="7.5">geohash: a metre apart, no shared prefix</text>
  <text x="99" y="102" text-anchor="middle" font-size="7">fixed by querying the 8 neighbours (page 3)</text>
  <g fill="#fff" stroke="#333">
    <use href="#h" x="300" y="48"/>
    <use href="#h" x="321" y="60.1"/><use href="#h" x="300" y="72.2"/><use href="#h" x="279" y="60.1"/><use href="#h" x="279" y="35.9"/><use href="#h" x="300" y="23.8"/><use href="#h" x="321" y="35.9"/>
  </g>
  <use href="#h" x="300" y="48" fill="#e6f2ff" stroke="#1d4e89"/>
  <line x1="300" y1="48" x2="321" y2="60.1" stroke="#1d4e89"/><text x="314" y="50" font-size="7" fill="#1d4e89">d</text>
  <line x1="300" y1="48" x2="279" y2="35.9" stroke="#1d4e89"/><text x="284" y="46" font-size="7" fill="#1d4e89">d</text>
  <text x="300" y="98" text-anchor="middle" font-size="7.5">H3: six neighbours, one distance; k rings = a radius</text>
  <text x="300" y="109" text-anchor="middle" font-size="7">16 resolutions, each finer cell ≈ 1/7 the area</text>
  <text x="392" y="30" font-size="7">quadtree: the same</text><text x="392" y="40" font-size="7">square split 4 ways</text><text x="392" y="50" font-size="7">until a leaf is</text><text x="392" y="60" font-size="7">small enough</text>
  <defs><path id="h" d="M14,0 L7,12.1 L-7,12.1 L-14,0 L-7,-12.1 L7,-12.1 z"/></defs>
</svg>

- The interview answer names the property, not the library. A hexagon has one neighbour distance, so "everything within k rings" is a fixed set of cells with no corner nearer than an edge. Uber's H3 post gives that as the reason for hexagons, and the 16 resolutions as the reason surge (page 7) and matching can use different cell sizes on one grid

### The failure

- `WHERE lat BETWEEN … AND lng BETWEEN …` on two ordinary indexes. The planner intersects two range scans, each covering a band around the planet, and reads a million rows to return ten. A cell id column, or a spatial index, is what turns two dimensions into one key
