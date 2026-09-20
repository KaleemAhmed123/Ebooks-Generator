## Partitions in production

- A **network partition** splits the system into groups of nodes that can talk to each other but not across the split. Each group may believe it is the whole system

| Incident | What happened |
|---|---|
| **Twilio, July 2013** | Redis primary partitioned from replicas. Both sides served traffic. 1.1% of customers overbilled for ~40 minutes |
| **GitHub, Sept 2012** | Split brain in their database cluster. Private repositories briefly shown to the wrong users |
| **AWS EBS, April 2011** | A stuck network reconfiguration. EBS volumes in one AZ unreachable for 12+ hours. Cascading RDS failures |

- These are not theoretical. They are in the postmortems. Each one started with a network path that failed while the nodes on both sides stayed up

### What the postmortems share

- The system continued to serve on both sides of the split. Both sides believed they were authoritative
- The damage happened not during the partition, but during **healing**: when the two halves tried to merge their divergent state
- Preventing this is the subject of booklet 03 (consensus, leader election, fencing)

### The failure

- Treating partitions as a whiteboard concern. "We're in the cloud, the network is managed." The cloud is where the 2011 EBS outage happened
