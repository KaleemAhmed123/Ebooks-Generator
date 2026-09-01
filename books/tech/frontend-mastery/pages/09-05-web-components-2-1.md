## Web Components - continued

:::mint
<svg viewBox="0 0 470 142" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .lbl { font: 10px Georgia, serif; fill: #1a1a1a; }
    .sm  { font: 8px Consolas, monospace; fill: #4a4a4a; }
    .tiny{ font: 7px Consolas, monospace; fill: #6a6a72; }
    .bx  { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .soft{ fill: #ffffff; stroke: #8fbfae; stroke-width: 1; stroke-dasharray: 3 2; }
    .ar  { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .hot { fill: #ef476e; font: bold 8px Consolas, monospace; }
    .hotbx { fill: #ffffff; stroke: #ef476e; stroke-width: 1.2; }
    .hotln { stroke: #ef476e; stroke-width: 1.1; fill: none; }
    .bar { fill: #d8ece4; stroke: #8fbfae; stroke-width: 0.8; }
    .barh{ fill: #fbdde5; stroke: #ef476e; stroke-width: 0.8; }
  </style>
  <defs>
    <marker id="a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
    <marker id="r" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#ef476e"/>
    </marker>
  </defs>

  <text x="6" y="12" class="sm">WHAT CROSSES THE SHADOW BOUNDARY</text>

  <rect class="bx" x="6" y="24" width="150" height="90" rx="4"/>
  <text x="81" y="40" class="lbl" text-anchor="middle">your page</text>
  <text x="16" y="58" class="sm">global stylesheet</text>
  <text x="16" y="72" class="sm">Tailwind utilities</text>
  <text x="16" y="86" class="sm">--card-bg: ...</text>
  <text x="16" y="102" class="sm">::part(trigger) { }</text>

  <line x1="230" y1="18" x2="230" y2="120" stroke="#ef476e" stroke-width="1.4" stroke-dasharray="5 3"/>
  <text x="230" y="132" class="hot" text-anchor="middle">shadow boundary</text>

  <rect class="bx" x="304" y="24" width="160" height="90" rx="4"/>
  <text x="384" y="40" class="lbl" text-anchor="middle">shadow root</text>
  <text x="314" y="58" class="sm">:host { }</text>
  <text x="314" y="72" class="sm">h3 { } scoped, cannot leak</text>
  <text x="314" y="86" class="sm">&lt;slot&gt;</text>
  <text x="314" y="102" class="sm">part="trigger"</text>

  <line class="hotln" x1="176" y1="58" x2="224" y2="58"/>
  <line class="hotln" x1="224" y1="54" x2="216" y2="62" />
  <line class="hotln" x1="216" y1="54" x2="224" y2="62" />
  <text x="200" y="50" class="hot" text-anchor="middle">blocked</text>

  <line class="ar" x1="176" y1="88" x2="300" y2="88" marker-end="url(#a)"/>
  <text x="238" y="82" class="tiny" text-anchor="middle">custom properties pass through</text>
  <line class="ar" x1="176" y1="104" x2="300" y2="104" marker-end="url(#a)"/>
  <text x="238" y="114" class="tiny" text-anchor="middle">::part is a door you open on purpose
</svg>
:::
leak out, and styles outside cannot reach in.

```js
class UserCard extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        h3 { font-size: 1.1rem; margin: 0; }  /* cannot escape */
      </style>
      <h3><slot name="name"></slot></h3>
      <slot></slot>`;
  }
}
```

That isolation is the strongest style encapsulation the platform offers,
stronger than CSS Modules, because it is enforced by the DOM rather than by
generated class names.

**Templates and slots.** `<slot>` is where the light DOM content projects in,
the same idea as `children` in React.
