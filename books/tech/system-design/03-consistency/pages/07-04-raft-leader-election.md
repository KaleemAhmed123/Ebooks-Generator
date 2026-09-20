## Raft: leader election

- Every node is in one of three states. A **follower** answers requests and expects a heartbeat from the leader. A follower that hears nothing for its **election timeout** becomes a **candidate**: it increments its term, votes for itself, and sends `RequestVote` to every node. A majority of votes makes it **leader**; it starts sending heartbeats. A candidate that hears from a leader with an equal or higher term steps back to follower

<svg viewBox="0 0 460 110" role="img" aria-label="State diagram. Follower becomes candidate on election timeout. Candidate becomes leader on majority of votes, becomes follower on hearing a current leader or higher term, and starts a new election on timeout. Leader becomes follower on seeing a higher term." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="40" width="90" height="30" rx="15" fill="#fcfcfc" stroke="#1a1a1a"/><text x="65" y="59" text-anchor="middle" font-weight="bold">follower</text>
  <rect x="185" y="40" width="90" height="30" rx="15" fill="#fce4e2" stroke="#b8541a"/><text x="230" y="59" text-anchor="middle" font-weight="bold">candidate</text>
  <rect x="350" y="40" width="90" height="30" rx="15" fill="#e2fcf3" stroke="#1d4e89"/><text x="395" y="59" text-anchor="middle" font-weight="bold">leader</text>
  <path d="M110 50 H185" stroke="#1a1a1a" fill="none"/><path d="M185 50 l-5 -2.5 v5 z" fill="#1a1a1a"/>
  <text x="147" y="45" text-anchor="middle" font-size="7">no heartbeat for</text><text x="147" y="36" text-anchor="middle" font-size="7">election timeout</text>
  <path d="M275 50 H350" stroke="#1a1a1a" fill="none"/><path d="M350 50 l-5 -2.5 v5 z" fill="#1a1a1a"/>
  <text x="312" y="45" text-anchor="middle" font-size="7">votes from</text><text x="312" y="36" text-anchor="middle" font-size="7">a majority</text>
  <path d="M185 62 H110" stroke="#1a1a1a" fill="none"/><path d="M110 62 l5 -2.5 v5 z" fill="#1a1a1a"/>
  <text x="147" y="76" text-anchor="middle" font-size="7">a leader or higher</text><text x="147" y="85" text-anchor="middle" font-size="7">term shows up</text>
  <path d="M395 70 V96 H65 V70" stroke="#1a1a1a" fill="none"/><path d="M65 70 l-2.5 5 h5 z" fill="#1a1a1a"/>
  <text x="230" y="106" text-anchor="middle" font-size="7">sees a higher term</text>
  <path d="M215 40 C205 12, 255 12, 245 40" stroke="#b8541a" fill="none"/><path d="M245 40 l-1 -5.5 l-4.5 3 z" fill="#b8541a"/>
  <text x="230" y="14" text-anchor="middle" font-size="7" fill="#b8541a">timeout: new term, vote again</text>
</svg>

- Each node grants at most one vote per term, first come first served, so two candidates cannot both reach a majority. Two candidates can each fall short: a **split vote**. Raft breaks it by randomizing each node's election timeout within a range; the paper's is 150–300 ms. The node whose timeout fires first usually wins before the others notice
- A vote has one more condition, on page 6: a node refuses a candidate whose log is behind its own. Election is where Raft's safety is enforced, not just where a leader is chosen

### The failure

- Election timeouts set close to the round-trip time. Heartbeats arrive late under load, followers time out, an election starts, the old leader steps down, the new leader's heartbeats also arrive late. An **election storm**: the cluster spends its time voting. The rule and the numbers are on page 8
