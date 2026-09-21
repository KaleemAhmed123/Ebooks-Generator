## Rebalances

- A **rebalance** is the group reassigning partitions after a member joins, leaves, or is declared dead. Under the classic protocol every member gives up its partitions, waits for the new assignment, and starts again: processing pauses for the whole group

<svg viewBox="0 0 460 140" role="img" aria-label="Rebalance timeline. Processing normally. Consumer B dies. Rebalance triggers, pausing all processing. Partitions are reassigned to Consumer A. Processing resumes." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M50 40 L400 40" stroke="#1d4e89" fill="none" stroke-width="2"/>
  <text x="20" y="43" text-anchor="middle" font-weight="bold">A</text>
  
  <path d="M50 80 L180 80" stroke="#1d4e89" fill="none" stroke-width="2"/>
  <text x="20" y="83" text-anchor="middle" font-weight="bold">B</text>
  
  <circle cx="180" cy="80" r="4" fill="#b8541a"/>
  <text x="180" y="95" text-anchor="middle" font-size="6" fill="#b8541a">Consumer B dies</text>
  
  <rect x="200" y="10" width="80" height="100" fill="#fce4e2" opacity="0.5"/>
  <text x="240" y="25" text-anchor="middle" font-weight="bold" fill="#b8541a">REBALANCE</text>
  <text x="240" y="60" text-anchor="middle" font-size="6" fill="#b8541a">All processing</text>
  <text x="240" y="70" text-anchor="middle" font-size="6" fill="#b8541a">is paused</text>
  
  <text x="340" y="30" text-anchor="middle" font-size="6">Consumer A resumes</text>
  <text x="340" y="55" text-anchor="middle" font-size="6">with B's partitions</text>
</svg>

- Death is decided by two timers. A member that sends no heartbeat within `session.timeout.ms` (45 s) is dead. A member that does not call poll within `max.poll.interval.ms` (5 min) is treated as stuck and removed, even if its heartbeats are fine
- A rolling deploy of ten pods is ten leaves and ten joins: twenty rebalances. **Static membership** (`group.instance.id` set per pod) tells the coordinator a restarted pod is the same member, so a quick restart keeps its partitions and triggers nothing
- A rebalance is also when duplicates happen: a partition moves before its last offsets were committed, and the new owner replays from the last commit

### The failure

- The `max.poll.interval.ms` loop. A batch takes six minutes; the coordinator evicts the member at five; the member finishes, tries to commit, fails because it no longer owns the partition; it rejoins, causing another rebalance, and receives the same records again. The group processes nothing while looking busy. Fix the batch size or the interval, not the timeout
