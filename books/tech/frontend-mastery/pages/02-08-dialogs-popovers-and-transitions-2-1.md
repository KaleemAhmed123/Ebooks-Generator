## Dialogs, Popovers, and View Transitions - continued

In React, note that `showModal()` is imperative. Reach for a `ref` and an effect, or use a library that wraps it, rather than trying to drive `open` from state. The `open` attribute renders a non-modal dialog with none of the focus behavior.

### The Popover API

`<dialog>` is for things that demand an answer. Popovers are for things that dismiss themselves: menus, tooltips, notification trays. The Popover API gives them the same top-layer placement plus **light dismiss**, meaning a click outside or an Escape closes them.

```html
<button popovertarget="menu">Account</button>

<div id="menu" popover>
  <a href="/profile">Profile</a>
  <a href="/logout">Sign out</a>
</div>
```

There is no JavaScript in that example. The attribute pairing wires up the trigger, the toggle, the top layer, the outside click, and Escape.

`popover="manual"` opts out of light dismiss when you want the element to stay until something explicitly closes it.
