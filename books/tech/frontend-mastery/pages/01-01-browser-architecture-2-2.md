### Why This Matters for Performance

When JavaScript modifies the DOM, it triggers a pipeline update. 

- **Layout Thrashing**: If you change a layout property (like `width`), you force a **Reflow**. If you immediately read a layout property (like `offsetWidth`), the browser must synchronously calculate the layout before continuing JavaScript execution. Doing this in a loop causes Layout Thrashing, a reliable way to drop frames.
- **Paint Only**: Changing properties like `color` or `background` skips the Layout phase and only triggers **Paint** and **Composite**.
- **Composite Only**: Changing `transform` or `opacity` skips both Layout and Paint. The compositor thread simply moves or blends existing layers on the GPU. This is why animations should *always* use `transform` and `opacity`.

### The Multi-Process Architecture

Modern Chrome uses a multi-process architecture to ensure stability and security:
- **Browser Process**: Coordinates everything. Handles address bar, bookmarks, and network requests.
- **Renderer Process**: There is typically one per tab (or per site). It contains the main thread, the compositor thread, and the V8 engine. It executes your JavaScript and runs the CRP.
- **GPU Process**: Handles hardware acceleration and rasterization.

The Renderer Process is heavily sandboxed. It cannot access the file system directly; it must request the Browser Process to do so via Inter-Process Communication (IPC).

Understanding this architecture is the difference between a developer who throws `React.memo` at a laggy animation, and an engineer who moves the animation to a compositor-only `transform` property.
