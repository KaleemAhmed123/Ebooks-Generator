## Dialogs, Popovers, and View Transitions

Three platform features that each delete a dependency.

### `<dialog>`

A modal built from a `<div>` has to solve five problems by hand: render above everything else, trap focus inside, close on Escape, return focus to the trigger on close, and hide the rest of the page from screen readers. Most hand-built modals solve two of them.

`<dialog>` solves all five.

```html
<dialog id="confirm">
  <form method="dialog">
    <h2>Delete this project?</h2>
    <p>This cannot be undone.</p>
    <button value="cancel">Cancel</button>
    <button value="delete">Delete</button>
  </form>
</dialog>
```

```js
const dialog = document.getElementById('confirm');
dialog.showModal();                       // modal: traps focus, adds a backdrop
dialog.addEventListener('close', () => {
  if (dialog.returnValue === 'delete') deleteProject();
});
```

`showModal()` puts the element in the **top layer**, a browser-level stack that sits above every stacking context on the page. This is the fix for the `z-index: 9999` arms race: a top-layer element cannot be trapped by a parent's `transform` or `overflow: hidden`, because it is not painted inside that parent at all.

It also makes everything else inert automatically, so Tab cannot escape and screen readers stay inside. `method="dialog"` on the form closes the dialog on submit and puts the pressed button's `value` into `returnValue`.

Style the backdrop with the `::backdrop` pseudo-element.

```css
dialog::backdrop { background: oklch(0 0 0 / 0.5); backdrop-filter: blur(2px); }
```
