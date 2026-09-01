# Module 2 - Docker

## What a container actually is

- "Works on my machine" is a dependency problem: a different Node version, a missing system library, a different locale
- A **container** packages the application together with its entire userland, so the same bytes run identically anywhere
- It is **not a virtual machine.** There is no second kernel and no boot. A container is a normal Linux process with a restricted view of the system
- That restriction is built from three kernel features: **namespaces** hide what it can see, **cgroups** cap what it can use, and a **union filesystem** gives it its own root

:::mint
<svg viewBox="0 0 470 165" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 9px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .c { fill: #d9f2e6; stroke: #1a1a1a; stroke-width: 1.1; }
    .t { font: bold 8px Consolas, monospace; fill: #ef476e; }
  </style>

  <text x="8" y="12" class="t">VIRTUAL MACHINES</text>
  <rect class="b" x="8" y="18" width="200" height="18"/>
  <text x="108" y="31" class="s" text-anchor="middle">hardware</text>
  <rect class="b" x="8" y="38" width="200" height="18"/>
  <text x="108" y="51" class="s" text-anchor="middle">host OS + hypervisor</text>
  <rect class="c" x="8" y="58" width="64" height="34"/>
  <text x="40" y="72" class="s" text-anchor="middle">guest OS</text>
  <text x="40" y="85" class="s" text-anchor="middle">app</text>
  <rect class="c" x="76" y="58" width="64" height="34"/>
  <text x="108" y="72" class="s" text-anchor="middle">guest OS</text>
  <text x="108" y="85" class="s" text-anchor="middle">app</text>
  <rect class="c" x="144" y="58" width="64" height="34"/>
  <text x="176" y="72" class="s" text-anchor="middle">guest OS</text>
  <text x="176" y="85" class="s" text-anchor="middle">app</text>
  <text x="108" y="110" class="s" text-anchor="middle">gigabytes, boots in a minute</text>

  <text x="262" y="12" class="t">CONTAINERS</text>
  <rect class="b" x="262" y="18" width="200" height="18"/>
  <text x="362" y="31" class="s" text-anchor="middle">hardware</text>
  <rect class="b" x="262" y="38" width="200" height="18"/>
  <text x="362" y="51" class="s" text-anchor="middle">one shared host kernel</text>
  <rect class="c" x="262" y="58" width="64" height="34"/>
  <text x="294" y="79" class="s" text-anchor="middle">app</text>
  <rect class="c" x="330" y="58" width="64" height="34"/>
  <text x="362" y="79" class="s" text-anchor="middle">app</text>
  <rect class="c" x="398" y="58" width="64" height="34"/>
  <text x="430" y="79" class="s" text-anchor="middle">app</text>
  <text x="362" y="110" class="s" text-anchor="middle">megabytes, starts in a second</text>

  <text x="235" y="136" class="s" text-anchor="middle">one kernel is why containers are fast, and why isolation is weaker than a VM</text>
  <text x="235" y="150" class="s" text-anchor="middle">a Linux container needs a Linux kernel: on Windows and macOS a small VM provides one</text>
</svg>
:::
