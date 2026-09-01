### Focus Trapping (The Modal Problem)
Imagine a user clicks a button to open a "Delete Account" Modal window.
If they press `Tab` a few times, their focus will actually leave the Modal and start tabbing through the hidden links on the dark page *behind* the Modal!

This is a massive accessibility failure. When a Modal is open, you must **Trap the Focus**. 
When the user tabs past the last button in the modal, JavaScript must instantly force their focus back to the first button in the modal.

```jsx
// This is incredibly tedious to write manually using refs and event listeners.
// Always use a well-tested library for Modals.
import { Dialog } from '@headlessui/react';

function MyModal() {
  // Headless UI automatically traps focus and handles the Escape key!
  return (
    <Dialog open={true} onClose={() => {}}>
      <Dialog.Panel>
        <Dialog.Title>Deactivate account</Dialog.Title>
        <button>Confirm</button>
      </Dialog.Panel>
    </Dialog>
  );
}
```

### The `tabindex` Attribute
By default, only interactive elements (`<button>`, `<a>`, `<input>`) can be focused.
If you build a custom interactive element out of a `<div>`, you must give it a `tabindex="0"` so the browser knows to include it in the Tab flow.

```html
<!-- Now a keyboard user can actually land on this custom element -->
<div role="button" tabindex="0" onclick="handleClick()">Custom Button</div>
```

If you give an element `tabindex="-1"`, it removes it from the Tab flow entirely, but still allows you to programmatically focus it using JavaScript (`ref.current.focus()`). This is useful for routing. When a user clicks a link to change pages in a React SPA, you should programmatically focus the `<h1>` of the new page so screen readers announce the transition!
