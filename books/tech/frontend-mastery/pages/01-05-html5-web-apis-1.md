## HTML5 Web APIs

The modern browser is a powerful operating system in its own right, exposing dozens of hardware and software APIs to JavaScript. Mastering these APIs allows you to build rich, native-like experiences on the web.

Here are the critical Web APIs every senior frontend engineer must know.

### 1. Intersection Observer API

Before the Intersection Observer, detecting if an element was visible on screen required binding to the `scroll` event and continuously running expensive `getBoundingClientRect()` calculations. This caused massive Layout Thrashing and battery drain.

The **Intersection Observer API** offloads this calculation to the browser, notifying you asynchronously when an element enters or exits the viewport.

**Primary Use Cases:**
- Infinite scrolling.
- Lazy-loading images.
- Triggering scroll-based animations.

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Element is on screen!');
      // Load image, trigger animation, etc.
      observer.unobserve(entry.target); // Stop observing once loaded
    }
  });
}, {
  rootMargin: '100px', // Trigger 100px before it actually enters the screen
  threshold: 0.1 // Trigger when 10% of the element is visible
});

document.querySelectorAll('.lazy-image').forEach(img => observer.observe(img));
```
