## How often it happens

- Not often enough to see in staging. Often enough to matter every week in production

| Finding | Source |
|---|---|
| 5.2 device failures and 40.8 link failures per day in one datacenter; median repair 5 minutes; median 59,000 packets lost per failure | Microsoft datacenter study, in Bailis & Kingsbury's catalogue |
| 61 outages in 700 days | Google's Chubby lock service, same catalogue |
| 136 partition failures studied across 25 systems: 80% catastrophic, 90% silent, 21% left permanent damage after healing | Alquraan et al., OSDI 2018 |
| 88% of those failures could be triggered by isolating a single node; 29% were partial partitions | same study |

- Read the last two rows together. Most partition bugs need one node cut off, not a dramatic split. And a third are *partial*: some nodes can reach the isolated one, some cannot, so every node has a different picture
- **Silent** is the word that matters. Nine in ten of those failures produced no error. The data was wrong and nothing said so

### The failure

- "Our network is reliable" as the reason to skip timeouts and retries. The sentence is true most of the time. The system is only tested on the days it is not
- Chaos tests that only ever cut the network cleanly in half. Nine in ten of the studied failures needed just one node isolated, and a third were partial. Test those
