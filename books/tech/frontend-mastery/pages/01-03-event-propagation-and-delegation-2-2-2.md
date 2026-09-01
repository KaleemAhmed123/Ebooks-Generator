### Passive Event Listeners

Scroll and touch events fire at an incredibly high frequency (60+ times per second). If an event listener contains expensive operations, it can cause the page to stutter ("jank").

Worse, the browser doesn't know if your touch listener will call `event.preventDefault()` to stop scrolling. So, the browser is forced to wait for your listener to finish executing before it can physically scroll the page.

You can fix this by declaring the listener as `passive`. This explicitly promises the browser that you will not call `preventDefault()`, allowing the browser to scroll the page immediately on the compositor thread without waiting for your JavaScript.

```javascript
document.addEventListener('touchstart', handleTouch, { passive: true });
```
Modern browsers now default `touchstart` and `touchmove` listeners to `passive: true` on window and document levels, but it is a critical optimization to know.
