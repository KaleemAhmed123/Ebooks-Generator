## How often it happens

- Not often enough to test in staging. Often enough to matter in production

| Finding | Source |
|---|---|
| 5.2 device failures and 40.8 link failures per day in a datacenter | Microsoft DC study, cited in Bailis & Kingsbury |
| Median 59,000 packets lost per failure event | same study |
| Top-of-rack switch failures caused 40 partitions in two years | Google, cited in Alquraan et al. 2018 |
| 70% of downtime in one study traced to network faults | Microsoft, cited in Alquraan et al. 2018 |
| 61 outages in 700 days | Chubby (Google's lock service), Bailis & Kingsbury |

- These are not exotic events. They are Tuesday. A cluster that runs for a year will see dozens of link failures and multiple partitions
- The numbers come from inside a datacenter with managed hardware. On the public internet, the rates are higher. On mobile networks, much higher

### The failure

- "Our network is reliable" as the reason for skipping retry logic and timeout configuration. The sentence is true most of the time. The failures happen when the network is unreliable, which is the only time the system is tested for real
