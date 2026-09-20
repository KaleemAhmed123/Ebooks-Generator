## Client-side prediction

- When you click and drag a rectangle in Figma, the rectangle must move *instantly* on your screen. If there is a 50ms network delay before the rectangle moves, the tool will feel sluggish and broken
- Figma solves this using **Client-Side Prediction**. The browser assumes that every action the user takes is perfectly valid. It updates the local WebGL canvas immediately, without waiting for the server to confirm the write

```typescript
// How Figma moves a shape locally without waiting for the network
function onMouseDrag(shapeId: string, dx: number, dy: number) {
  // 1. Predict the success: Update the local memory instantly
  const shape = documentTree.get(shapeId);
  shape.x += dx;
  shape.y += dy;
  
  // 2. Render the new frame instantly (0ms latency for the user)
  engine.renderFrame();
  
  // 3. Asynchronously send the action to the server in the background
  websocket.send(JSON.stringify({
    type: 'MOVE',
    id: shapeId,
    dx: dx,
    dy: dy
  }));
}
```

- This is optimistic concurrency taken to the extreme. The client assumes the server will accept the write. But what happens if the server rejects it, or if another user moved the exact same shape at the exact same time?

### The failure

- Relying purely on server validation before drawing a box. If you build a web app where a button says "Loading..." while the server validates the X/Y coordinates of a shape, your users will leave. In highly interactive tools, the UI must predict the future, and silently correct itself later if it guessed wrong
