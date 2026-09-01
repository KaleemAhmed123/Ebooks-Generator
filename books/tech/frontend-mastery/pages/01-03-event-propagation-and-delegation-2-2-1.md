### Event Delegation

Attaching event listeners consumes memory. If you have a list of 1,000 items, attaching 1,000 `click` listeners will bloat memory and degrade performance.

Because events bubble, we can use a powerful pattern called **Event Delegation**. Instead of attaching 1,000 listeners to the children, we attach a single listener to the parent.

```html
<ul id="todo-list">
  <!-- Imagine 1000 list items here -->
  <li data-id="1">Buy groceries</li>
  <li data-id="2">Walk the dog</li>
</ul>
```

```javascript
document.getElementById('todo-list').addEventListener('click', (event) => {
  // Check what was actually clicked using event.target
  if (event.target.tagName === 'LI') {
    const todoId = event.target.getAttribute('data-id');
    console.log(`Clicked todo: ${todoId}`);
  }
});
```

Benefits of Event Delegation:
1. **Memory Efficiency**: Only 1 listener instead of 1,000.
2. **Dynamic Elements**: If you add new `<li>` elements to the list later via JavaScript, they automatically inherit the behavior without needing new listeners attached to them.

React uses a highly optimized form of Event Delegation under the hood. It attaches exactly one event listener to the root of your application (`<div id="root">`) for every event type, and routes events internally using a Synthetic Event system.
