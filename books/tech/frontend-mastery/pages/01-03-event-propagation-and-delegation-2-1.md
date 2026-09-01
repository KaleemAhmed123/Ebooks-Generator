### Stopping Propagation

Sometimes, you do not want an event to bubble up. For example, you have a clickable "Card" component, but inside the card, there is a "Delete" button. Clicking the delete button should *not* trigger the card's click action.

You stop this using `event.stopPropagation()`.

```javascript
document.getElementById('child').addEventListener('click', (event) => {
  event.stopPropagation();
  console.log('Child clicked. Parent will NOT know.');
});
```

*Note on `preventDefault`:* `event.stopPropagation()` stops the event from bubbling up the tree. `event.preventDefault()` stops the browser's default behavior (e.g., stopping a form from submitting, or a link from navigating). They do two completely different things.
