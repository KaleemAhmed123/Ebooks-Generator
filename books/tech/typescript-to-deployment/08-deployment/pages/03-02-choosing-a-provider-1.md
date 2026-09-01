## Choosing a provider

- They all rent the same thing: a virtual machine with an address. **They differ on price per unit of memory, network quality, and how much is included**

| Provider | Strength | Watch |
|---|---|---|
| **Hetzner** | by far the most memory per rupee. Excellent network in Europe | fewer regions, stricter signup checks |
| **DigitalOcean** | best documentation, clean console, managed add-ons | roughly twice Hetzner's price |
| **Vultr** | many regions, hourly billing, good for short-lived boxes | support is thinner |
| **Linode / Akamai** | stable, predictable, good support | middle of the pack on price |
| **Contabo** | the cheapest specifications on paper | oversubscribed, variable performance |
| **OVH / Scaleway** | cheap in Europe, bare metal available | console and support are weaker |
| **Oracle Cloud free tier** | a genuinely free ARM box with 24 GB | reclaimed without notice, no guarantee |

### What actually matters when picking

- **Region.** Latency to your users is the one thing you cannot fix later. India, pick Mumbai or Singapore
- **Included egress.** Most include several terabytes. AWS bills every gigabyte, and that difference is often the whole price gap
- **Snapshots and backups.** A provider snapshot is one click and a small monthly fee. Take it
- **ARM against x86.** ARM instances are cheaper for the same performance. **Build a multi-architecture image**, as Module 2 covers, and it just works
