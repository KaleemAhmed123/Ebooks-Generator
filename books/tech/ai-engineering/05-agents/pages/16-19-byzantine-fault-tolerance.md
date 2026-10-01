## Byzantine fault tolerance

- Voting assumes agents are merely *diverse*. **Byzantine fault tolerance (BFT)** handles the harder case: some agents are *arbitrarily faulty* — buggy, compromised, or adversarial — and may send *conflicting lies* to different peers. BFT is how a system reaches correct consensus *despite* such traitors. **[VERIFY]**

<svg viewBox="0 0 360 90" role="img" aria-label="With 3f+1 agents the honest majority can outvote f traitors to reach correct consensus" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <g fill="#24405e"><circle cx="60" cy="34" r="12"/><circle cx="110" cy="34" r="12"/><circle cx="160" cy="34" r="12"/></g>
  <circle cx="210" cy="34" r="12" fill="#a03050"/>
  <text x="60" y="37" text-anchor="middle" fill="#fff" font-size="5.5">✓</text><text x="110" y="37" text-anchor="middle" fill="#fff" font-size="5.5">✓</text><text x="160" y="37" text-anchor="middle" fill="#fff" font-size="5.5">✓</text><text x="210" y="37" text-anchor="middle" fill="#fff" font-size="5.5">✗</text>
  <text x="135" y="62" text-anchor="middle" font-size="6" fill="#1a3a2a">3 honest outvote 1 traitor</text>
  <rect x="250" y="24" width="100" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="300" y="34" text-anchor="middle" font-size="6">n ≥ 3f + 1</text><text x="300" y="44" text-anchor="middle" font-size="5.5" fill="#6b6b6b">tolerate f traitors</text>
</svg>

- **The famous result — the "3f+1" bound:** to tolerate **f** Byzantine (arbitrarily faulty) agents, you need at least **3f + 1** total agents. To survive 1 traitor you need 4 agents; 2 traitors, 7. The intuition: the honest agents must be able to outvote the traitors *even when* the traitors coordinate and lie inconsistently, and the math works out to needing a two-thirds honest supermajority.
- **Why so many are needed:** a Byzantine agent can tell agent X "the answer is A" and agent Y "the answer is B" — sowing disagreement, not just being wrong. Overcoming *coordinated inconsistent lies* (not just honest errors) requires the large honest majority that 3f+1 guarantees. This is far stronger — and costlier — than simple majority voting, which assumes agents at least *report the same thing to everyone*.
- **When LLM agents need BFT:** rarely, but when the stakes justify it — high-value decisions where an agent could be *compromised* (prompt-injected, 14-128, or malicious in a cross-org setting, 16-16) and you must still reach a correct decision. For most cooperative in-house multi-agent systems, simple voting (16-18) suffices; BFT is for adversarial or safety-critical consensus.

:::interview
"What's the 3f+1 rule in Byzantine fault tolerance?"

To reach correct consensus while tolerating f *Byzantine* agents — ones that can fail arbitrarily, including sending different lies to different peers — you need at least 3f+1 total agents (4 to survive 1 traitor, 7 for 2). The reason it's more than a simple majority is that a Byzantine agent doesn't just err, it can *coordinate inconsistent lies* to sow disagreement, so you need a roughly two-thirds honest supermajority to outvote them regardless of how they behave. For LLM agents it matters when an agent could be compromised (prompt injection) or adversarial (cross-org) and a correct decision is still required; cooperative in-house systems usually only need simple voting.
:::
