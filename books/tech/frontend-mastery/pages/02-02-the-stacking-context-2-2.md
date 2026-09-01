### Debugging Stacking Contexts

If your `z-index` isn't working:
1. Don't increase the number.
2. Open Chrome DevTools.
3. Traverse *up* the DOM tree from your broken element.
4. Look for ancestors with `opacity < 1`, `transform`, or `position: relative; z-index: 0`.
5. One of those ancestors has trapped your element. Fix the ancestor's z-index relative to the object it needs to overlap.
