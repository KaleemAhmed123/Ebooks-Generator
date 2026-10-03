# The Idea

## Declarative vs imperative infra

- **Infrastructure as Code (IaC)** means your cloud — VPCs, clusters, databases, IAM — is defined in **version-controlled files**, not clicked together in a console. The console is invisible, unreviewable, and unrepeatable; a file is diffable, reviewable in a pull request, and reproducible in a second region. This is the same shift Booklet 6 made for workloads, now applied to the cloud underneath them.
- The deeper split is **how** you express it. **Imperative** tooling (a bash script, raw AWS CLI calls) lists the **steps**: "create the VPC, then the subnets, then the cluster." You own the ordering, the "does it already exist?" checks, and the cleanup. **Declarative** tooling (Terraform/OpenTofu) describes the **end state** — "these resources should exist, wired this way" — and the tool computes the steps to get there.

<svg viewBox="0 0 360 96" role="img" aria-label="Imperative scripts list ordered steps you must sequence and guard; declarative IaC describes the desired end state and the tool diffs it against reality and computes the actions" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="12" width="150" height="72" rx="4" fill="#f6f4fa" stroke="#5c4b8a"/><text x="83" y="25" text-anchor="middle" font-size="6.4" fill="#5c4b8a">imperative (script)</text><text x="83" y="40" text-anchor="middle" font-size="5.8">1. if !vpc: create vpc</text><text x="83" y="52" text-anchor="middle" font-size="5.8">2. if !subnet: create…</text><text x="83" y="64" text-anchor="middle" font-size="5.8">3. order + guards = yours</text><text x="83" y="77" text-anchor="middle" font-size="5.2" fill="#777">you own "already exists?"</text>
  <rect x="202" y="12" width="150" height="72" rx="4" fill="#e6e1f1" stroke="#5c4b8a"/><text x="277" y="25" text-anchor="middle" font-size="6.4" fill="#5c4b8a">declarative (IaC)</text><text x="277" y="40" text-anchor="middle" font-size="5.8">"these resources exist,"</text><text x="277" y="52" text-anchor="middle" font-size="5.8">"wired like this"</text><text x="277" y="64" text-anchor="middle" font-size="5.8">tool diffs → computes steps</text><text x="277" y="77" text-anchor="middle" font-size="5.2" fill="#777">you own the end state</text>
  <path d="M158 48 L202 48" stroke="#1a1a1a" marker-end="url(#i1)"/>
  <defs><marker id="i1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- The declarative tool reaches the end state by **diffing desired against actual** and acting only on the gap — the reconcile idea from Booklet 6, run on demand instead of in a loop. Run it against an empty account and it creates everything; run it again and it does **nothing**, because desired already equals actual. You stop writing "create-if-not-exists" logic forever.
- What this buys, concretely: **code review for infrastructure** (a diff a colleague approves before anything changes), **a git history** of every infra change, **reproducibility** (the same code stands up staging and prod), and **a blast-radius preview** (the `plan`, two pages on) before you touch production.

:::note
IaC does *not* require declarative — you can write imperative IaC (AWS CDK and Pulumi generate declarative plans from general-purpose code; raw scripts are fully imperative). The valuable property is **declarative + versioned + diffable**: the tool, not you, works out the order and the idempotency, and a human reviews the *intent* as a code change. The rest of this booklet uses **Terraform/OpenTofu** because it's the dominant declarative IaC in 2026 and the one infra roles expect.
:::
