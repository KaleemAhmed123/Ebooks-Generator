### Focus Trapping (The Modal Problem)

Open a modal, press `Tab` past its last button, and focus walks out into the
links on the page behind — which the user cannot see and did not ask for.
Trapping focus means the last element hands focus back to the first.

:::mint
<svg viewBox="0 0 470 186" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .lbl { font: 9px Georgia, serif; fill: #1a1a1a; }
    .sm  { font: 8px Consolas, monospace; fill: #4a4a4a; }
    .tiny{ font: 7px Consolas, monospace; fill: #6a6a72; }
    .bx  { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .btn { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .dim { fill: #f4f4f4; stroke: #b8b8be; stroke-width: 1; }
    .soft{ fill: none; stroke: #8fbfae; stroke-width: 1; stroke-dasharray: 3 2; }
    .ar  { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .bad { stroke: #ef476e; stroke-width: 1.3; fill: none; }
    .hot { fill: #ef476e; font: bold 7px Consolas, monospace; }
    .ok  { fill: #2f7d63; font: bold 7px Consolas, monospace; }
  </style>
  <defs>
    <marker id="k" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
    <marker id="r" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#ef476e"/>
    </marker>
  </defs>

  <text x="8" y="11" class="sm">WITHOUT A TRAP</text>
  <text x="250" y="11" class="sm">WITH A TRAP</text>

  <rect class="soft" x="8" y="18" width="212" height="158" rx="4"/>
  <text x="14" y="30" class="tiny">page behind the overlay</text>
  <rect class="bx" x="26" y="40" width="176" height="58" rx="3"/>
  <text x="34" y="54" class="lbl">Delete account?</text>
  <rect class="btn" x="34" y="62" width="56" height="18" rx="2"/>
  <text x="44" y="74" class="tiny">Cancel</text>
  <rect class="btn" x="102" y="62" width="60" height="18" rx="2"/>
  <text x="112" y="74" class="tiny">Confirm</text>
  <line class="ar" x1="92" y1="71" x2="100" y2="71" marker-end="url(#k)"/>
  <path class="bad" d="M162,80 C186,92 190,118 150,128" marker-end="url(#r)"/>
  <rect class="dim" x="60" y="130" width="88" height="16" rx="2"/>
  <text x="68" y="141" class="tiny">Nav link</text>
  <text x="26" y="162" class="hot">Tab leaves the modal</text>
  <text x="26" y="172" class="tiny">focus is now somewhere invisible</text>

  <rect class="soft" x="244" y="18" width="212" height="158" rx="4"/>
  <text x="250" y="30" class="tiny">page behind the overlay</text>
  <rect class="bx" x="262" y="40" width="176" height="58" rx="3"/>
  <text x="270" y="54" class="lbl">Delete account?</text>
  <rect class="btn" x="270" y="62" width="56" height="18" rx="2"/>
  <text x="280" y="74" class="tiny">Cancel</text>
  <rect class="btn" x="338" y="62" width="60" height="18" rx="2"/>
  <text x="348" y="74" class="tiny">Confirm</text>
  <line class="ar" x1="328" y1="71" x2="336" y2="71" marker-end="url(#k)"/>
  <path class="ar" d="M398,80 L398,90 L298,90 L298,82" marker-end="url(#k)"/>
  <rect class="dim" x="296" y="130" width="88" height="16" rx="2"/>
  <text x="304" y="141" class="tiny">Nav link</text>
  <text x="262" y="162" class="ok">Tab wraps to the first control</text>
  <text x="262" y="172" class="tiny">the page behind is never reachable</text>
</svg>
:::

```jsx
// Tedious to write by hand with refs and event listeners.
// Use a well-tested dialog for this.
import { Dialog } from '@headlessui/react';

function MyModal() {
  // Headless UI traps focus and handles the Escape key.
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
