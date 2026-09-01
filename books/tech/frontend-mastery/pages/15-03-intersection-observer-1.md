## Intersection Observer

Historically, if you wanted to know when an element scrolled into view (e.g., to trigger an animation, or to implement Infinite Scrolling), you had to attach an event listener to the window: `window.addEventListener('scroll', checkPosition)`.

This was terrible for performance. The `scroll` event fires hundreds of times per second. Even if you throttled it, calculating an element's position using `getBoundingClientRect()` forces the browser to recalculate the entire page layout (a synchronous Reflow), causing massive scroll stuttering on mobile devices.

### The Modern Solution: Intersection Observer

The `IntersectionObserver` API completely offloads this work to the browser's native engine. It runs asynchronously in the background and only notifies your JavaScript code when an element actually crosses the threshold into the viewport.

```jsx
import { useEffect, useRef, useState } from 'react';

export function FadeInImage({ src, alt }) {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    // 1. Create the observer
    const observer = new IntersectionObserver((entries) => {
      // 3. This callback fires when the element enters (or leaves) the viewport
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Optional: Stop observing once it's loaded to save memory
        observer.disconnect(); 
      }
    });
```
