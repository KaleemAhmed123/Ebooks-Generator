## DNS as a control plane

- Module 7, page 9 placed DNS as the layer that picks a region. This page is about using it to *move* traffic, which is a different activity with one hard property: the TTL is a promise already given to resolvers you do not control and cannot retract

| Record TTL | Time before traffic has actually moved |
|---|---|
| 60 s | about a minute, if resolvers honour it |
| 300 s | five minutes — the common default |
| 3 600 s | an hour of traffic still arriving at the old address |
| 86 400 s | a day, and the failover plan does not work |

- The table is optimistic, because it assumes the TTL is respected. Some resolvers enforce a floor, some cache past expiry under load, and some client libraries resolve once at process start and never again — a long-running service can hold an address until it is restarted
- Health-checked DNS narrows the gap but cannot close it. The provider stops handing out a failed region's address quickly; everything already holding that answer keeps using it until its own copy expires. So DNS failover time is detection plus TTL plus the resolvers that ignore both

### The failure

- A 24-hour TTL on the record the disaster plan depends on. The runbook says "repoint DNS", the change is made in seconds, and traffic keeps arriving at a dead region for the rest of the day because every resolver in the world was told the answer was good for that long
- It is set once, usually years earlier, often for a good reason — long TTLs reduce query volume and cost — and nothing ever re-examines it. The rule that follows: any record that a failover moves has a short TTL permanently, and is shortened *before* it is needed, because dropping a TTL from a day to a minute takes a day to take effect. Reducing it during an incident does nothing at all
