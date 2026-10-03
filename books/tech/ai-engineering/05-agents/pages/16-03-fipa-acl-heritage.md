## The heritage: FIPA and ACL

- Multi-agent systems are not new — the field predates LLMs by decades. **Multi-agent systems (MAS)** were a serious AI research area in the 1990s–2000s, and they left standards and ideas that LLM agents are now rediscovering. Knowing the lineage prevents reinventing solved problems.

<svg viewBox="0 0 360 84" role="img" aria-label="Classical agent communication: a performative wrapping content, from the FIPA ACL standard" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="30" y="24" width="300" height="40" rx="4" fill="#eef6fb" stroke="#24405e"/>
  <rect x="42" y="34" width="80" height="20" rx="3" fill="#a03050"/><text x="82" y="47" text-anchor="middle" fill="#fff" font-size="6">performative</text>
  <text x="150" y="41" font-size="6" fill="#6b6b6b">(request / inform /</text><text x="150" y="51" font-size="6" fill="#6b6b6b">propose / accept …)</text>
  <rect x="248" y="34" width="70" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="283" y="47" text-anchor="middle" font-size="6">content</text>
</svg>

- **FIPA** (Foundation for Intelligent Physical Agents) standardized how agents talk. Its **ACL** (Agent Communication Language) is the key idea: each message carries a **performative** — its *intent* — alongside its content. Not just "the price is $5" but *inform*("the price is $5"), or *request*, *propose*, *accept-proposal*, *refuse*, *query*. The performative tells the receiver what *kind* of speech act this is, so agents coordinate on intent, not just data.
- **Why it still matters:** LLM multi-agent systems face the *same* problems classical MAS solved — how do agents address each other, express intent, negotiate, reach agreement, avoid deadlock? The classical answers (performatives, the contract net protocol of 16-05, negotiation protocols, consensus algorithms) are directly reusable. Today's frameworks often reinvent thinner versions of them.
- **What changed with LLMs:** classical agents were *narrow* — hand-coded behaviors, rigid protocols. LLM agents are *general* — they understand natural language, so communication can be flexible prose instead of a rigid ACL, and an agent can play many roles. The *coordination problems* are old; the *agents* are newly capable.

:::note
The lesson of the heritage: multi-agent *coordination* is a mature field, and LLM agents inherit its hard-won concepts — intent-carrying messages, negotiation protocols, consensus, contract-net task allocation. When you hit a coordination problem (agents talking past each other, deadlocking, failing to agree), the odds are it was studied and solved decades ago in classical MAS. The novelty of LLM agents is their *generality and language*, not the coordination challenges, which are as old as distributed AI.
:::
