# The Network

## VPC and subnets

- A **VPC** (Virtual Private Cloud) is your own isolated network inside an AWS region, defined by a **CIDR block** (Booklet 2) — say `10.0.0.0/16`, giving you 65,536 private addresses to carve up. Nothing outside your VPC can reach into it unless you explicitly allow it. You then split the VPC into **subnets**, each a smaller CIDR (`10.0.1.0/24`) that lives in **exactly one Availability Zone** (AZ — a distinct datacentre).
- Two properties drive every VPC design:
  - **Public vs private subnet** — the distinction is purely **routing** (next page): a **public** subnet has a route to the internet; a **private** subnet does not. You put internet-facing things (load balancers, NAT) in public subnets and everything else — app servers, databases, pods — in **private** subnets, so they have no direct inbound path from the internet.
  - **Spread across AZs** — put a subnet in each of 2–3 AZs and run your workload in all of them, so losing one datacentre loses only part of your capacity, not the system (Booklet 12's multi-AZ availability).

<svg viewBox="0 0 360 100" role="img" aria-label="A VPC spans two availability zones, each with a public subnet holding a load balancer and NAT, and a private subnet holding app servers and a database" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.6" fill="#1a1a1a">
  <rect x="8" y="8" width="344" height="86" rx="4" fill="#fdfaf3" stroke="#8a5a00"/><text x="16" y="19" font-size="6" fill="#8a5a00">VPC 10.0.0.0/16</text>
  <rect x="20" y="24" width="160" height="62" rx="3" fill="#fff" stroke="#bbb"/><text x="100" y="34" text-anchor="middle" font-size="5.8" fill="#8a5a00">AZ-a</text>
  <rect x="200" y="24" width="144" height="62" rx="3" fill="#fff" stroke="#bbb"/><text x="272" y="34" text-anchor="middle" font-size="5.8" fill="#8a5a00">AZ-b</text>
  <rect x="28" y="38" width="144" height="18" fill="#fbf0dc" stroke="#8a5a00"/><text x="100" y="50" text-anchor="middle" font-size="5.6">public 10.0.1.0/24 — LB, NAT</text>
  <rect x="28" y="60" width="144" height="20" fill="#efe6d3" stroke="#8a5a00"/><text x="100" y="72" text-anchor="middle" font-size="5.6">private 10.0.2.0/24 — app, DB</text>
  <rect x="208" y="38" width="128" height="18" fill="#fbf0dc" stroke="#8a5a00"/><text x="272" y="50" text-anchor="middle" font-size="5.6">public 10.0.3.0/24</text>
  <rect x="208" y="60" width="128" height="20" fill="#efe6d3" stroke="#8a5a00"/><text x="272" y="72" text-anchor="middle" font-size="5.6">private 10.0.4.0/24</text>
</svg>

- Plan the CIDR deliberately (Booklet 2's warning): pick a VPC range that **won't overlap** the other VPCs or on-prem networks you'll ever peer with, and leave room to add subnets. Renumbering a live VPC is as painful as it sounds. The usual layout is **one public + one private subnet per AZ**, across 2–3 AZs — the foundation the next booklet (Terraform) will stamp out in code, and the shape EKS expects.
