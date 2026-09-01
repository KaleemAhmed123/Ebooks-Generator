## Choosing a provider

- Any provider offering a plain Ubuntu image works. Everything in this booklet is provider-agnostic
- What separates them is price per gigabyte of RAM, bandwidth allowance, and how fast a snapshot restores

| Provider | Notes |
|---|---|
| Hetzner | Cheapest RAM in Europe, strong price per core, EU and US regions |
| DigitalOcean | Clear panel, good documentation, managed databases alongside |
| Vultr | Wide region list, hourly billing |
| Linode (Akamai) | Stable and predictable pricing |
| OVH | Very cheap at the low end, thinner support |
| Contabo | Most RAM per dollar, slower disks, variable network |
| AWS Lightsail | Fixed-price VPS inside AWS, short path to other AWS services |
| AWS EC2 | Full control, per-second billing, the most moving parts |
| Oracle Cloud | A genuinely free ARM tier, fussy sign-up |

### What actually matters

- **Bandwidth allowance.** A box with 1 TB included beats a cheaper box with 200 GB the first time a video file gets popular
- **Snapshot speed.** This becomes the recovery time in Module 16
- **A region near the users.** Latency is the one thing money cannot fix afterwards
- **A working recovery console.** Module 2 explains why this gets tested at the worst possible moment
