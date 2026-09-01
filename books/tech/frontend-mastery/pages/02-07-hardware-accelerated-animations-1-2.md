## Hardware-Accelerated Animations - continued

```css
/* BAD: Animating 'left' triggers Layout Thrashing every frame */
.sidebar {
  left: -300px;
  transition: left 0.3s ease;
}
.sidebar.open {
  left: 0;
}

/* GOOD: Animating 'transform' happens entirely on the GPU */
.sidebar {
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}
.sidebar.open {
  transform: translateX(0);
}
```

### The `will-change` Property

When you apply a `transform` or `opacity` animation, the browser promotes that element to its own Graphics Layer, allowing the GPU to manipulate it independently of the rest of the page.
