## Rebalances

- In a Consumer Group, the broker (specifically the Group Coordinator) assigns partitions to consumers. But what happens if a consumer crashes? Or if you scale up and add a new consumer?
- The group must undergo a **Rebalance**. The coordinator revokes partitions from existing consumers and reassigns them to the new topology. During a classic rebalance, the entire group pauses processing ("stop-the-world")

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

- Rebalances are the first operational nightmare most engineers encounter. If you deploy a new version of your app, the rolling restart will trigger a rebalance for every pod that goes down, and another when it comes back up. (You can avoid this using Static Membership `group.instance.id`).

### The failure

- The `max.poll.interval.ms` rebalance storm. To detect dead consumers, the broker requires them to regularly poll for data. The default max interval is 5 minutes. If your application takes 6 minutes to process a batch of messages, the broker assumes it died and kicks it out, triggering a rebalance. But the app isn't dead—it's just slow. It finishes processing, tries to commit, fails (because it was evicted), and polls again. It rejoins the group, triggering *another* rebalance. You are stuck in an endless loop of rebalances where no work ever completes
