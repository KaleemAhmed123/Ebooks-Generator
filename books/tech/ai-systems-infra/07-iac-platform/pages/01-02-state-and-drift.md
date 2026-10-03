## State and drift

- A declarative tool needs to know **which real resources it already created**, or it couldn't tell "update this VPC" from "make a new one." Terraform/OpenTofu records that in a **state file** — a JSON map from each resource in your code (`aws_vpc.main`) to its real-world ID (`vpc-0abc…`) and last-known attributes. State is how the tool connects your code to reality.
- Every run does three things: **refresh** (read the real resources the state knows about), **diff** (compare them and your code to desired), and (on apply) **act**. So state is the pivot of the whole model — and its two failure modes define most IaC incidents.

<svg viewBox="0 0 360 92" role="img" aria-label="Terraform compares three things: your code as desired, the state file as last-known, and the real cloud as actual; drift is when the cloud diverges from state after a manual console change" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="30" width="86" height="26" rx="3" fill="#e6e1f1" stroke="#5c4b8a"/><text x="51" y="42" text-anchor="middle" font-size="6">code (desired)</text><text x="51" y="51" text-anchor="middle" font-size="4.8" fill="#777">what you want</text>
  <rect x="137" y="30" width="86" height="26" rx="3" fill="#f6f4fa" stroke="#5c4b8a"/><text x="180" y="42" text-anchor="middle" font-size="6">state (known)</text><text x="180" y="51" text-anchor="middle" font-size="4.8" fill="#777">last-applied map</text>
  <rect x="266" y="30" width="86" height="26" rx="3" fill="#fdecea" stroke="#c0392b"/><text x="309" y="42" text-anchor="middle" font-size="6">cloud (actual)</text><text x="309" y="51" text-anchor="middle" font-size="4.8" fill="#777">real resources</text>
  <path d="M94 43 L137 43" stroke="#1a1a1a" marker-end="url(#st)"/><path d="M223 43 L266 43" stroke="#1a1a1a" marker-end="url(#st)"/>
  <text x="115" y="38" text-anchor="middle" font-size="4.8" fill="#777">plan diff</text>
  <text x="309" y="72" text-anchor="middle" font-size="5.4" fill="#c0392b">manual console edit → drift</text>
  <path d="M309 56 L309 66" stroke="#c0392b" marker-end="url(#st)"/>
  <defs><marker id="st" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- **Drift** is when the real cloud diverges from state — almost always because someone changed a resource **by hand** in the console (a "quick fix" at 3am). The next `plan` *detects* it (refresh sees the real value differs) and proposes to **revert it back to the code**, because code is desired. If that manual change was load-bearing and undocumented, the apply that "just syncs" can break production. The discipline that prevents it: **all changes go through code**, never the console.
- State also drives **dependency ordering** and **`destroy`**: the tool knows a subnet depends on its VPC, so it creates in order and destroys in reverse. Lose or corrupt state and the tool is blind — it either tries to **recreate resources that already exist** or **orphans** ones it forgets it owns.

:::warn
State is the truth **and** the danger. It contains **secrets in plaintext** — a database password or generated key lands in state even if your code reads it from a secret store (Module 2.6). Two engineers applying at once can **corrupt** it with interleaved writes. And a bad `destroy` against the wrong state wipes real infrastructure. These three risks are exactly why state goes in a **locked, encrypted, versioned remote backend** (Module 2.4), never a laptop and never git.
:::
