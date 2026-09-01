## OAuth 2.0

- OAuth exists for one problem: letting an application act on a user's behalf **without receiving their password**
- Before it, integrations asked for your actual credentials, which meant unlimited and unrevokable access
- Four parties, and the names are worth learning because every error message uses them
- The **resource owner** is the user. The **client** is the app. The **authorization server** issues tokens. The **resource server** holds the data

:::mint
<svg viewBox="0 0 470 178" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .l { font: 8px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7px Consolas, monospace; fill: #4a4a4a; }
    .a { stroke: #1a1a1a; stroke-width: 1; fill: none; }
    .hot { font: bold 7px Consolas, monospace; fill: #ef476e; }
  </style>
  <defs>
    <marker id="oa" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="b" x="8" y="14" width="70" height="22" rx="3"/>
  <text x="43" y="29" class="l" text-anchor="middle">user</text>
  <rect class="b" x="166" y="14" width="70" height="22" rx="3"/>
  <text x="201" y="29" class="l" text-anchor="middle">your app</text>
  <rect class="b" x="330" y="14" width="96" height="22" rx="3"/>
  <text x="378" y="29" class="l" text-anchor="middle">auth server</text>

  <line class="a" x1="43" y1="38" x2="43" y2="162"/>
  <line class="a" x1="201" y1="38" x2="201" y2="162"/>
  <line class="a" x1="378" y1="38" x2="378" y2="162"/>

  <line class="a" x1="45" y1="52" x2="197" y2="52" marker-end="url(#oa)"/>
  <text x="120" y="48" class="s" text-anchor="middle">1  sign in with Google</text>

  <line class="a" x1="203" y1="72" x2="374" y2="72" marker-end="url(#oa)"/>
  <text x="288" y="68" class="s" text-anchor="middle">2  redirect + code_challenge</text>

  <line class="a" x1="376" y1="92" x2="45" y2="92" marker-end="url(#oa)"/>
  <text x="210" y="88" class="s" text-anchor="middle">3  user logs in and consents</text>

  <line class="a" x1="41" y1="112" x2="197" y2="112" marker-end="url(#oa)"/>
  <text x="120" y="108" class="s" text-anchor="middle">4  redirect back with code</text>

  <line class="a" x1="203" y1="132" x2="374" y2="132" marker-end="url(#oa)"/>
  <text x="288" y="128" class="s" text-anchor="middle">5  code + code_verifier</text>

  <line class="a" x1="376" y1="152" x2="205" y2="152" marker-end="url(#oa)"/>
  <text x="288" y="148" class="hot" text-anchor="middle">6  access + refresh token</text>

  <text x="235" y="174" class="s" text-anchor="middle">the password never reaches your app, and the code alone is useless</text>
</svg>
:::
