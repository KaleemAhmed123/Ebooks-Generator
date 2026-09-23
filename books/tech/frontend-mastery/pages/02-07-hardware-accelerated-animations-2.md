## Hardware-Accelerated Animations - continued

However, promoting an element to a layer takes time. If you start an animation on hover, the first few frames might drop while the browser sets up the layer.

You can preemptively tell the browser to create a layer using the `will-change` property.

```css
.heavy-card {
  will-change: transform, opacity;
}
```
*Warning:* Do not put `will-change` on everything. Every Graphics Layer consumes VRAM (Video Memory). If you create too many layers, you will crash the browser on lower-end devices. Use it surgically on elements that are complex and frequently animated.

### The FLIP Technique

Sometimes, you *have* to animate a layout change. For example, a grid of items where one item expands, pushing the others around. You cannot do this with simple CSS transforms.

To achieve 60fps in this scenario, engineers use the **FLIP** technique (First, Last, Invert, Play).

1. **First**: Record the exact current geometry of the element using `element.getBoundingClientRect()`.
2. **Last**: Apply the class that causes the layout change (e.g., `element.classList.add('expanded')`). Let the browser instantly recalculate the layout synchronously. Record the new geometry.
3. **Invert**: The element is now physically in its final position. Calculate the difference between the First and Last positions (e.g., it moved 100px down and grew by 1.5x). Apply a `transform` with a negative translation and scale to make the element *appear* as if it is still in its starting position.
4. **Play**: Turn on a CSS transition, and remove the inverted `transform` (set it to `translate(0,0) scale(1)`). 

The element will now smoothly animate from its starting position to its final position using a hardware-accelerated `transform`, even though the destination was determined by a slow layout calculation. 

Libraries like Framer Motion use the FLIP technique heavily under the hood to power complex layout animations in React.
