## Modern Layouts: Flexbox and Grid - continued

```css
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer  { grid-area: footer; }
```
This is fully responsive. To change the layout on mobile to a single column, you just redefine the ASCII art in a media query:

```css
@media (max-width: 768px) {
  .app-layout {
    grid-template-areas:
      "header"
      "content"
      "sidebar"
      "footer";
    grid-template-columns: 1fr;
  }
}
```
