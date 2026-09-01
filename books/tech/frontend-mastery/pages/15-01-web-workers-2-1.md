### OffscreenCanvas

A worker cannot touch the DOM, which normally rules out anything visual. Canvas
is the exception.

`OffscreenCanvas` hands a canvas to a worker so drawing happens off the main
thread entirely.

```js
// main thread
const canvas = document.querySelector('canvas');
const offscreen = canvas.transferControlToOffscreen();
worker.postMessage({ canvas: offscreen }, [offscreen]);
```

```js
// worker
onmessage = ({ data }) => {
  const ctx = data.canvas.getContext('2d');
  requestAnimationFrame(function draw() {
    ctx.clearRect(0, 0, data.canvas.width, data.canvas.height);
    // heavy drawing, none of it blocking the page
    requestAnimationFrame(draw);
  });
};
```

`transferControlToOffscreen` transfers ownership. The main thread can no longer
draw to that canvas, which is the point.

Worth it for a chart redrawing sixty times a second, a data visualization over
thousands of points, an image editor, or a game. Not worth it for a sparkline.
