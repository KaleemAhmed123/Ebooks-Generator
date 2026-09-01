### The Power of Inheritance and Scope

Because Custom Properties cascade just like normal CSS, their values can be redefined for specific scopes without writing new class names.

Imagine a highly reusable `Card` component.

```css
.card {
  /* It defaults to a white surface, but is overridable! */
  background-color: var(--card-bg, var(--surface)); 
  color: var(--text-color);
  padding: 1rem;
}
```

If we want a specific "Dark Card", we don't need to write `.card.dark-card { background-color: #333; color: white; }`. We simply redefine the variables within a scoping class.

```css
.theme-dark {
  --card-bg: #1f2937;
  --text-color: #f9fafb;
}
```

```html
<!-- Renders as a white card -->
<div class="card">Hello</div> 

<!-- Renders as a dark card because the variables cascade down! -->
<div class="theme-dark">
  <div class="card">Dark Mode</div> 
</div>
```
