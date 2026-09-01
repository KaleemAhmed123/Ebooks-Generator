# Module 16: Accessibility

## Semantic HTML and ARIA Attributes

Accessibility (often abbreviated as **a11y** because there are 11 letters between 'a' and 'y') is not an afterthought. In many countries, it is a legal requirement. If your e-commerce site is not accessible to a blind user using a Screen Reader (like NVDA or VoiceOver), your company can be sued.

### Semantic HTML (The First Line of Defense)
The biggest mistake junior developers make is building everything out of `<div>` tags.

```html
<!-- BAD: The Anti-Pattern -->
<div class="header">
  <div class="nav-item">Home</div>
  <div class="button" onclick="submit()">Submit</div>
</div>
```

To a sighted user, CSS makes this look like a perfectly normal website. To a blind user using a Screen Reader, the software reads this as: *"Group. Text Home. Group. Text Submit."* They have absolutely no idea that "Submit" is a clickable button.

You must use **Semantic HTML**. 

```html
<!-- GOOD: The Accessible Way -->
<header>
  <nav>
    <a href="/">Home</a>
  </nav>
  <button onclick="submit()">Submit</button>
</header>
```
Now, the Screen Reader says: *"Navigation landmark. Link, Home. Button, Submit."* The user instantly understands how to interact with the page.
