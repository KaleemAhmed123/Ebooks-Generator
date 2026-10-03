## Remote state and locking

- State on a laptop (the default **local backend**) fails a team instantly: no one else can see it, there's no backup, and two people applying produce two divergent truths. A **remote backend** stores state in shared, durable storage — on AWS, an **S3 bucket** — so the whole team and CI read and write **one** state. Enable bucket **versioning** (every state revision kept, so you can roll back a corrupted one) and **encryption at rest**.
- The second half is **locking**: before an apply, the tool takes a **lock** so a concurrent apply **waits** instead of interleaving writes and corrupting state (Module 1.2's corruption risk). The lock is the difference between "two engineers, one safe state" and a mangled file.

<svg viewBox="0 0 360 90" role="img" aria-label="Two engineers and CI share one S3 state bucket; a lock ensures only one apply proceeds at a time while the others wait" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="12" width="70" height="18" rx="3" fill="#f6f4fa" stroke="#5c4b8a"/><text x="43" y="24" text-anchor="middle" font-size="6">engineer A</text>
  <rect x="8" y="38" width="70" height="18" rx="3" fill="#f6f4fa" stroke="#5c4b8a"/><text x="43" y="50" text-anchor="middle" font-size="6">engineer B</text>
  <rect x="8" y="64" width="70" height="18" rx="3" fill="#f6f4fa" stroke="#5c4b8a"/><text x="43" y="76" text-anchor="middle" font-size="6">CI pipeline</text>
  <rect x="150" y="30" width="96" height="36" rx="4" fill="#e6e1f1" stroke="#5c4b8a"/><text x="198" y="44" text-anchor="middle" font-size="6.2">S3 state bucket</text><text x="198" y="56" text-anchor="middle" font-size="5" fill="#777">versioned · encrypted</text>
  <rect x="286" y="34" width="66" height="28" rx="4" fill="#fff3cd" stroke="#b8860b"/><text x="319" y="46" text-anchor="middle" font-size="6">lock</text><text x="319" y="56" text-anchor="middle" font-size="4.8" fill="#777">one at a time</text>
  <path d="M78 21 L150 40" stroke="#1a1a1a" marker-end="url(#rs)"/><path d="M78 47 L150 48" stroke="#999" stroke-dasharray="2 2" marker-end="url(#rs)"/><path d="M78 73 L150 58" stroke="#999" stroke-dasharray="2 2" marker-end="url(#rs)"/>
  <path d="M246 48 L286 48" stroke="#1a1a1a" marker-end="url(#rs)"/>
  <defs><marker id="rs" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- How locking works on S3 **changed**. For years you needed a separate **DynamoDB table** to hold the lock (S3 had no atomic compare-and-set). Since **Terraform 1.11 (Feb 2025)**, the S3 backend has **native state locking** via **`use_lockfile = true`** — it writes a `.tflock` object using S3's conditional-write support, so **the DynamoDB table is no longer required** (and the DynamoDB locking arguments are **deprecated**). New backends should use the lockfile; both can be set at once to migrate.

:::mint
```hcl
terraform {
  backend "s3" {
    bucket       = "acme-tfstate"
    key          = "prod/network.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true      # S3-native lock (TF 1.11+); no DynamoDB
  }
}
```
:::

- The `key` is the state's **path within the bucket**, and splitting state by `key` (`prod/network`, `prod/cluster`) is how you keep blast radius small: a mistake in the cluster state can't touch the network state, and applies to different layers don't block each other on one lock.
