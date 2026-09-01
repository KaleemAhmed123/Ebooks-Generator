## Event Propagation and Delegation

Interactivity in the browser is driven by events (clicks, keypresses, scrolls, mouse movements). Understanding how these events flow through the DOM tree is critical for building performant applications and avoiding bizarre bugs.

### The Event Flow: Capture, Target, Bubble

When you click a button deeply nested inside a web page, the event does not just instantly appear on the button. It travels through the DOM in three distinct phases:

1. **The Capture Phase**: The event starts at the absolute root of the document (`window` -> `document` -> `<html>` -> `<body>`) and travels *down* the DOM tree until it reaches the target element.
2. **The Target Phase**: The event fires on the actual element that was clicked.
3. **The Bubbling Phase**: The event turns around and travels back *up* the DOM tree, firing on every ancestor element until it reaches the root again.

By default, when you add an event listener via `addEventListener`, it listens during the **Bubbling** phase.

```html
<div id="parent" onclick="console.log('Parent clicked')">
  <button id="child" onclick="console.log('Child clicked')">Click Me</button>
</div>
```

If you click the button, the console will log:
1. `Child clicked` (Target Phase)
2. `Parent clicked` (Bubbling Phase)
