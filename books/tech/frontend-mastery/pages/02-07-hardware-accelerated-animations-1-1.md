## Hardware-Accelerated Animations

Animations can make an application feel incredibly premium, or remarkably cheap. The difference lies entirely in frame rate. A smooth 60 Frames Per Second (FPS) animation feels fluid and natural. Anything lower feels janky, sluggish, and broken.

To achieve 60fps, the browser has exactly **16.6 milliseconds** to calculate layout, paint pixels, and render the frame. If your animation forces the browser to do too much work, you miss the 16.6ms deadline, the frame drops, and the user perceives "jank".

### The Rule of Thumb: Transform and Opacity Only

As discussed in the Browser Architecture chapter, changing properties like `width`, `height`, `top`, or `margin` forces the browser to recalculate the **Layout** of the entire page. Changing `color` or `background` forces a **Paint**. Both of these are slow, CPU-bound operations.

The **GPU (Graphics Processing Unit)** is highly optimized for moving and blending pixels. If you want a smooth animation, you must hand the work over to the GPU's Compositor Thread.

The Compositor Thread can only animate two properties cheaply:
1. **`transform`** (translate, scale, rotate)
2. **`opacity`**

**NEVER animate `width`, `height`, `top`, or `left`.**

#### Example: A sliding sidebar
