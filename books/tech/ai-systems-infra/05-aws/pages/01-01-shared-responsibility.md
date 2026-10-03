# The Account and Identity

## The shared responsibility model

- The cloud splits security into two halves, and knowing **where the line sits** is the difference between a secure system and a breach. AWS secures **the cloud itself** — datacentres, hardware, the hypervisor, the internals of managed services. **You** secure what you put **in** the cloud — your IAM policies, your data, your network configuration, and (on some services) the OS and runtime. AWS gives you safe tools; misusing them is your problem, not theirs.
- The line **moves by service type**, and that's the whole point:

<svg viewBox="0 0 360 96" role="img" aria-label="The shared responsibility line moves by service: on EC2 you manage the OS and app; on containers less; on managed and serverless AWS handles the OS, leaving you data, IAM, and config" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.6" fill="#1a1a1a">
  <text x="60" y="12" text-anchor="middle" font-size="6.3" fill="#8a5a00">EC2 (IaaS)</text>
  <text x="180" y="12" text-anchor="middle" font-size="6.3" fill="#8a5a00">ECS/EKS</text>
  <text x="300" y="12" text-anchor="middle" font-size="6.3" fill="#8a5a00">Lambda/managed</text>
  <rect x="16" y="18" width="88" height="30" fill="#fbf0dc" stroke="#8a5a00"/><text x="60" y="30" text-anchor="middle">you: OS · runtime</text><text x="60" y="40" text-anchor="middle">· app · data · IAM</text>
  <rect x="136" y="18" width="88" height="22" fill="#fbf0dc" stroke="#8a5a00"/><text x="180" y="27" text-anchor="middle">you: container ·</text><text x="180" y="35" text-anchor="middle">app · data · IAM</text>
  <rect x="256" y="18" width="88" height="14" fill="#fbf0dc" stroke="#8a5a00"/><text x="300" y="27" text-anchor="middle">you: data · IAM · config</text>
  <rect x="16" y="50" width="328" height="16" fill="#efe6d3" stroke="#8a5a00"/><text x="180" y="61" text-anchor="middle">AWS: hardware · hypervisor · managed-service internals · physical</text>
  <text x="180" y="82" text-anchor="middle" font-size="5.8" fill="#777">more managed → smaller "you" slice → fewer things to secure and patch</text>
</svg>

- On **EC2** you patch the OS, configure the firewall, and secure the app — maximum control, maximum responsibility. On **ECS/EKS** AWS runs more of the substrate. On **Lambda and managed services** (S3, RDS, DynamoDB) AWS handles the OS and patching entirely, leaving you **data, access (IAM), and configuration**. "Serverless" doesn't mean "someone else secures it" — it means your remaining responsibilities are *narrower*, and almost entirely about **access control and config**.

:::warn
The overwhelming majority of cloud incidents are **customer-side misconfiguration**, not AWS being hacked: a **public S3 bucket** exposing data, an **over-broad IAM policy** a leaked key then abuses, a **security group open to `0.0.0.0/0`** on a database port. The shared responsibility model is telling you where to look — your config, your IAM, your network rules — *before* blaming the platform. The next three pages are the single biggest part of your half: identity.
:::
