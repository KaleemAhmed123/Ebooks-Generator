## Actions and the Form Hooks

A form submission has always needed the same four pieces of state, written by hand every time: the pending flag, the error, the optimistic value, and the reset. React 19 gave that pattern a name, **Actions**, and three hooks that supply the pieces.

:::mint
<svg viewBox="0 0 470 158" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .lbl { font: 10px Georgia, serif; fill: #1a1a1a; }
    .sm  { font: 8px Consolas, monospace; fill: #4a4a4a; }
    .tiny{ font: 7px Consolas, monospace; fill: #6a6a72; }
    .bx  { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .soft{ fill: #ffffff; stroke: #8fbfae; stroke-width: 1; stroke-dasharray: 3 2; }
    .ar  { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .hot { fill: #ef476e; font: bold 8px Consolas, monospace; }
    .hotbx { fill: #ffffff; stroke: #ef476e; stroke-width: 1.2; }
  </style>
  <defs>
    <marker id="a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <text x="6" y="12" class="sm">ONE SUBMISSION, THREE HOOKS, THREE JOBS</text>

  <rect class="bx" x="6" y="24" width="458" height="94" rx="4"/>
  <text x="16" y="38" class="sm">&lt;form action={formAction}&gt;</text>

  <rect class="soft" x="18" y="48" width="140" height="62" rx="4"/>
  <text x="88" y="63" class="lbl" text-anchor="middle">useActionState</text>
  <text x="88" y="78" class="sm"  text-anchor="middle">returned value</text>
  <text x="88" y="90" class="sm"  text-anchor="middle">wrapped action</text>
  <text x="88" y="102" class="sm" text-anchor="middle">isPending</text>

  <rect class="soft" x="168" y="48" width="140" height="62" rx="4"/>
  <text x="238" y="63" class="lbl" text-anchor="middle">useOptimistic</text>
  <text x="238" y="80" class="sm"  text-anchor="middle">shows the guess now</text>
  <text x="238" y="94" class="hot" text-anchor="middle">rolls back on its own</text>

  <rect class="soft" x="318" y="48" width="134" height="62" rx="4"/>
  <text x="385" y="63" class="lbl" text-anchor="middle">useFormStatus</text>
  <text x="385" y="80" class="sm"  text-anchor="middle">read from a child</text>
  <text x="385" y="94" class="tiny" text-anchor="middle">no prop drilling</text>

  <line class="ar" x1="88"  y1="118" x2="88"  y2="130" marker-end="url(#a)"/>
  <text x="88"  y="144" class="tiny" text-anchor="middle">returns errors, does not throw</text>
  <text x="300" y="144" class="tiny" text-anchor="middle">a thrown error hits the Error Boundary instead</text>
</svg>
:::

An Action is just an async function passed to a form's `action` prop.

```jsx
<form action={submitAction}>
```

React calls it with the `FormData`, keeps the form disabled while it runs, and resets the uncontrolled inputs when it succeeds.
