## Modules

- Copy-pasting the same 40 lines of VPC HCL into three environments is the drift problem from Module 1 reborn in your own code — fix a bug in one copy, forget the others. A **module** is a reusable package of resources with a defined **input/output interface**: write the network once, call it three times with different variables.
- Every configuration is already a module — the **root module** is the directory you run. A **child module** is a directory (local path or a registry address) you invoke with a `module` block, passing variables in and reading its outputs back. The caller treats it as a black box: it knows the inputs and outputs, not the resources inside.

<svg viewBox="0 0 360 96" role="img" aria-label="A root module calls a network module and a cluster module, passing variables in and consuming their outputs; the cluster module consumes the network module's subnet-id outputs" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="116" y="8" width="128" height="20" rx="3" fill="#e6e1f1" stroke="#5c4b8a"/><text x="180" y="21" text-anchor="middle">root module (env/prod)</text>
  <rect x="24" y="48" width="140" height="40" rx="4" fill="#f6f4fa" stroke="#5c4b8a"/><text x="94" y="61" text-anchor="middle" font-size="6.2">module "network"</text><text x="94" y="73" text-anchor="middle" font-size="5.2" fill="#777">in: cidr, azs</text><text x="94" y="83" text-anchor="middle" font-size="5.2" fill="#777">out: subnet_ids</text>
  <rect x="196" y="48" width="140" height="40" rx="4" fill="#f6f4fa" stroke="#5c4b8a"/><text x="266" y="61" text-anchor="middle" font-size="6.2">module "cluster"</text><text x="266" y="73" text-anchor="middle" font-size="5.2" fill="#777">in: subnet_ids</text><text x="266" y="83" text-anchor="middle" font-size="5.2" fill="#777">out: cluster_name</text>
  <path d="M150 28 L94 48" stroke="#999" marker-end="url(#m3)"/><path d="M210 28 L266 48" stroke="#999" marker-end="url(#m3)"/>
  <path d="M164 68 L196 68" stroke="#1a1a1a" marker-end="url(#m3)"/><text x="180" y="64" text-anchor="middle" font-size="4.8" fill="#777">subnet_ids</text>
  <defs><marker id="m3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- **Composition is the pattern:** small, single-purpose modules (network, cluster, database) wired together by passing one's outputs into another's inputs — exactly the `subnet_ids` handoff above. This mirrors Booklet 6's "small objects, loosely coupled" and the same discipline keeps configs testable: a module with a clear interface can be reused, versioned, and reasoned about alone.
- The **public registry** has maintained modules for common stacks (the widely-used `terraform-aws-modules/vpc`, `eks`), which encode a lot of hard-won defaults. The judgement call: a registry module saves weeks but is a **dependency you don't fully control** — pin its version, read what it creates, and don't pull a 300-resource module in to make one subnet.

:::warn
Over-modularising is as bad as not modularising. A module per single resource (`module "one_s3_bucket"`) adds indirection with no reuse — you now hop through three files to read one bucket. Make a module when there's **real reuse** (used in ≥2 places) or a **meaningful boundary** (the whole network layer), not reflexively. And a module's interface is a contract: renaming an input is a **breaking change** for every caller, so version modules like the APIs they are.
:::
