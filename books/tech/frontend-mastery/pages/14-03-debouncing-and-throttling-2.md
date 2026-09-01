### Throttling (The "Strict Metronome" Approach)
Throttling guarantees that a function will execute *exactly* once every X milliseconds, no matter how many times it is triggered.

**Analogy:** A bartender at a busy club. No matter how many times you yell your drink order at him, he will strictly only serve one drink every 5 minutes.

```javascript
// A simple Throttle utility function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      // Lock the function for X milliseconds
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Even if the user scrolls 1,000 pixels a second, 
// this will strictly only fire once every 200ms.
window.addEventListener('scroll', throttle(handleScroll, 200));
```
**Best Used For:** Scroll event listeners, window resizing, preventing a user from spamming a "Submit Order" button.
