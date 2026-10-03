## Plan and apply

- The core workflow is two commands, and the gap between them is the whole safety story. **`plan`** is a **dry run**: it refreshes state, diffs against your code, and prints exactly what it *would* do — with **no changes made**. **`apply`** executes that plan. You read the plan, confirm it matches your intent, then apply.
- The plan classifies every resource into four actions, and the symbols are worth reading carefully:

:::mint
```text
  + create      (new resource)
  ~ update      (change in place — safe)
-/+ replace     (DESTROY then create — downtime/data loss risk)
  - destroy     (remove it)
Plan: 7 to add, 1 to change, 2 to destroy.
```
:::

- The one that bites is **`-/+` replace**: some attribute changes can't be done in place (renaming an RDS instance, changing an EC2 AMI), so the tool **destroys and recreates** — which can mean an outage or, on a stateful resource, **data loss**. The summary line (`N to destroy`) and every `-/+` are what you scan for before applying to production. A plan that says "2 to destroy" when you expected a harmless tweak is the signal to **stop**.
- **Idempotency** is the property that makes this sane: apply the same code twice and the second run reports **"No changes"** — desired already equals actual (Module 1.1). You can run `apply` repeatedly, in CI, after a partial failure, without fear of duplicating resources. The plan is also the artifact teams **save and attach to a pull request** (Module 4.3) so the reviewer approves the *exact* diff that will run.

### Module 1 — checkpoint
- **Key concepts:** IaC = infra as **versioned, reviewable, reproducible** code · **declarative** (describe end state, tool diffs and computes steps) beats imperative scripts · **state** maps code → real resource IDs and is the pivot (refresh → diff → act); **drift** = reality diverges from state (manual console edits) and `plan` reverts it to code · **Terraform (BSL 1.1 since v1.6, Aug 2023)** vs **OpenTofu (MPL 2.0, Linux Foundation, v1.12.x, state encryption)**; HCL + providers shared; Pulumi = general-purpose languages · **plan (dry-run diff) → apply**; watch `-/+ replace` and `N to destroy`; idempotent.
- **Task + questions:** `tofu plan` an empty config, add an S3 bucket, plan again (see `+ create`), apply, plan again (see "No changes"); then change a force-new attribute and spot the `-/+`. Why does a manual console change show up as a *revert* on the next plan? Why must state never live in git?
- **Next:** Module 2 — writing it (providers, variables, modules, remote state).
