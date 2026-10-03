## BFT in practice: from consensus to blockchain

- Byzantine fault tolerance (16-19) is not just theory — it is the engine of real distributed systems, most famously **blockchains**, and understanding that connection sharpens when (and whether) agent systems need it.

<svg viewBox="0 0 360 82" role="img" aria-label="Nodes reach agreement on a shared ledger despite some faulty or malicious nodes" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <g fill="#24405e"><circle cx="60" cy="30" r="12"/><circle cx="120" cy="30" r="12"/><circle cx="60" cy="66" r="12"/></g>
  <circle cx="120" cy="66" r="12" fill="#a03050"/>
  <g stroke="#888"><line x1="72" y1="30" x2="108" y2="30"/><line x1="60" y1="42" x2="60" y2="54"/><line x1="120" y1="42" x2="120" y2="54"/><line x1="72" y1="66" x2="108" y2="66"/></g>
  <rect x="180" y="30" width="170" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="265" y="40" text-anchor="middle" font-size="6">agreed shared ledger</text><text x="265" y="50" text-anchor="middle" font-size="5.5" fill="#6b6b6b">correct despite the 1 bad node (3f+1)</text>
</svg>

- **Blockchains are BFT systems:** many nodes, some potentially malicious, must agree on a single shared ledger with no trusted central authority. BFT consensus (or proof-of-work/stake variants) is what lets them agree on the *true* transaction history despite bad actors — the 3f+1 idea (16-19) applied to money at global scale. It is BFT's most consequential real-world deployment.
- **The lesson for agent systems:** BFT is *powerful but expensive* — it needs many participants (3f+1), lots of communication, and complex protocols. Blockchains accept that cost because the stakes (irreversible financial transactions, no trusted party) justify it. **Most multi-agent systems do not have those stakes** — the agents are yours, cooperative, in one trust domain — so simple voting (16-18) or a trusted supervisor (16-07) suffices, and full BFT is over-engineering.
- **When agent systems *would* need BFT:** genuinely trustless, high-stakes, adversarial settings — cross-organization agents (16-16) making irreversible decisions where any agent could be compromised, or agent systems on a blockchain. Recognizing that these are *rare* is as important as knowing the mechanism: reach for BFT only when you truly have untrusted participants and unacceptable failure, not by default.

:::interview
"Where is Byzantine fault tolerance actually used, and do agent systems need it?"

Its flagship real-world use is blockchains: many nodes, some malicious, agreeing on one shared ledger with no trusted central authority — BFT (or its proof-of-work/stake variants) is what makes that agreement correct despite bad actors, the 3f+1 idea at global scale. But BFT is expensive (needs 3f+1 participants, heavy communication, complex protocols), justified only by blockchain-level stakes: irreversible transactions, no trusted party. Most multi-agent systems are cooperative agents in one trust domain, so simple voting or a trusted supervisor suffices — full BFT is over-engineering. You'd only need it in genuinely trustless, high-stakes, adversarial settings like cross-org agents making irreversible decisions. Knowing it's rarely needed matters as much as knowing the mechanism.
:::
