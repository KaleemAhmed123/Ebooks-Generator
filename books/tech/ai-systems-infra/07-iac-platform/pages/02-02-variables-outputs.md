## Variables, outputs, locals

- Hardcoded values turn one config into one deployment. Three constructs parameterise it so the same code serves many cases — and they map cleanly onto **inputs, computed values, and outputs**.
- **Variables — inputs.** A `variable` block declares a parameter with a **type**, an optional **default**, and (worth using) a **validation** rule. Callers set it via a `.tfvars` file, `-var`, or an env var. Typing catches mistakes early — pass a string where a number belongs and it fails at plan, not mid-apply.

:::mint
```hcl
variable "instance_count" {
  type    = number
  default = 2
  validation {
    condition     = var.instance_count <= 10
    error_message = "Max 10 per env."
  }
}
locals { name_prefix = "${var.env}-api" }      # computed once, reused
output "vpc_id" { value = aws_vpc.main.id }     # exported to callers
```
:::

- **Locals — computed intermediates.** A `local` is a named expression evaluated once and reused (`local.name_prefix`). Use it for values **derived** from variables or resources — a naming convention, a merged tag map, a conditional — so the logic lives in one place instead of being copy-pasted across resources.
- **Outputs — exported results.** An `output` surfaces a value *out* of the configuration: the VPC ID, a database endpoint, a cluster name. Outputs are how a **module** returns results to its caller (next page) and how one layer's facts feed another (the network layer outputs subnet IDs; the cluster layer consumes them).
- The distinction that keeps configs clean: **variables are what you accept, locals are what you compute, outputs are what you expose.** Mixing them — computing in variables, or exposing raw internals — is how a config becomes unreadable.

:::note
Mark sensitive values `sensitive = true` on the variable or output so the tool **redacts them from plan/apply logs** (a DB password won't scroll past in CI output). It's display-only — the value still lands in **state** in plaintext (Module 1.2), so it's a complement to a real secret store and state encryption (Module 2.6), not a substitute. Redaction in logs, encryption at rest, secret store for the value: three separate controls.
:::
