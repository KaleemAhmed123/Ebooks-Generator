### CSS Grid: The 2-Dimensional Engine

If Flexbox is a single row of boxes, CSS Grid is a spreadsheet. It handles both columns and rows simultaneously. It is the most powerful layout system ever introduced to CSS.

Instead of writing complex math for column percentages and margins, Grid handles the geometry internally.

```css
.container {
  display: grid;
  /* Creates 3 columns:
     1st is exactly 200px.
     2nd and 3rd equally share the remaining space (1 fraction each) */
  grid-template-columns: 200px 1fr 1fr;
  
  /* Creates a 20px gap between all columns and rows */
  gap: 20px; 
}
```

#### Grid Template Areas
Grid's most readable feature is `grid-template-areas`. You can literally draw your layout in ASCII art within your CSS.

```css
.app-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar content rightbar"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 60px 1fr 40px;
  height: 100vh;
}
```
