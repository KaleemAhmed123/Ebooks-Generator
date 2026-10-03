## Security groups vs NACLs

- AWS gives you two firewalls at two levels, and mixing them up causes real outages:
  - **Security Group (SG)** — attached to an instance/ENI (the resource), **stateful**, **allow-only**. You write allow rules for inbound and outbound; **return traffic is automatically permitted** (if you allowed the inbound request, its response flows back without an explicit rule). There is no "deny" rule — anything not allowed is simply denied.
  - **Network ACL (NACL)** — attached to a **subnet**, **stateless**, **allow and deny**, evaluated in **numbered order**. Stateless means it does **not** remember connections, so you must explicitly allow the **return** traffic (typically the ephemeral port range) as a separate rule.
- The division of labour: **security groups are your primary tool** — fine-grained, per-resource, easy to reason about. **NACLs are a coarse subnet-wide guardrail** — e.g. "block this malicious IP range at the subnet edge" or "this subnet may never talk to the internet." Most teams configure SGs carefully and leave NACLs at their default (allow-all), adding NACL deny rules only for broad blocks.

:::warn
The classic NACL bug: you allow inbound port 443 on a NACL, the request arrives, your server replies — and the reply is **dropped**, because the NACL is **stateless** and you never allowed the **outbound ephemeral ports** (roughly 1024–65535) the response uses. Connections half-open and time out, and it looks like a mysterious network fault. Security groups never do this (they're stateful). The lesson: if you touch NACLs, you must allow return traffic in **both** directions — which is exactly why most people leave NACLs alone and do their filtering with stateful SGs.
:::

- A powerful SG pattern worth knowing: an SG rule can reference **another security group** instead of a CIDR. "Allow inbound 5432 **from** the app-tier SG" means any instance in the app SG can reach the database, with no IP addresses hard-coded — as instances come and go, the rule keeps working. This is how you express "the app may talk to the DB, nothing else may" cleanly, and it's the AWS-native version of Booklet 11's zero-trust segmentation.
