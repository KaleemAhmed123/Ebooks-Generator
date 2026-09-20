## Partitions in production

- A **network partition** splits the system into groups of nodes that can talk to each other but not across the split. Each group may believe it is the whole system

| Incident | What happened |
|---|---|
| **Twilio, July 2013** | Redis primary cut off from its replicas. Writes stayed consistent; the damage came on healing, when every replica resynced at once, the primary was restarted, and a config file made it a replica of itself. 1.1% of customers overbilled for ~40 minutes |
| **GitHub, Sept 2012** | **Split brain**: two nodes each believing it is the leader. Private repositories briefly shown to the wrong users |
| **AWS EBS, April 2011** | A traffic shift executed wrongly cut one zone's storage nodes off; the re-mirroring storm that followed kept volumes unreachable for 12+ hours, and some multi-AZ databases failed to fail over |

- These are not theoretical. They are in the postmortems. Each one started with a network path that failed while the nodes on both sides stayed up

### What the postmortems share

- The partition itself was survivable. The damage came from what the system did *about* it: a resync storm, a restart, a failover that did not happen, a split that let two sides write
- **Healing** is the dangerous moment. Everything that was cut off comes back at once, with state that may disagree
- Preventing this is the subject of booklet 03 (consensus, leader election, fencing)

### The failure

- Treating partitions as a whiteboard concern. "We're in the cloud, the network is managed." The cloud is where the 2011 EBS outage happened
