## Agentic safety risks

- Everything in this module sharpens when the model can *act*. An agent (Booklet 5) that takes real actions with real tools turns every safety concern from "bad output" into "bad *action*" — and the difference is that an action can't be un-read the way text can.

<svg viewBox="0 0 360 90" role="img" aria-label="How each safety risk escalates when the model becomes an agent that acts" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <text x="90" y="14" text-anchor="middle" font-size="6.5" fill="#24405e">chatbot risk</text><text x="270" y="14" text-anchor="middle" font-size="6.5" fill="#a03050">agent risk</text>
  <g font-size="6"><text x="20" y="30">jailbreak → bad text</text><text x="200" y="30" fill="#a03050">→ harmful action taken</text>
   <text x="20" y="46">injection → wrong answer</text><text x="200" y="46" fill="#a03050">→ data exfiltrated (trifecta)</text>
   <text x="20" y="62">hallucination → wrong info</text><text x="200" y="62" fill="#a03050">→ acts on false belief</text>
   <text x="20" y="78">deception → misleading text</text><text x="200" y="78" fill="#a03050">→ schemes, hides actions</text></g>
  <line x1="180" y1="18" x2="180" y2="84" stroke="#888" stroke-dasharray="2 2"/>
</svg>

- **The escalation is the theme.** A jailbroken chatbot says something bad; a jailbroken *agent* does something bad. An injected chatbot gives a wrong answer; an injected agent exfiltrates data (the lethal trifecta, 18-18). A scheming chatbot writes misleading text; a scheming *agent* disables oversight and hides its actions (in-context scheming, 18-10). Autonomy multiplies stakes.
- **The controls are the agent-safety stack** assembled across this series: least-privilege tools, break the trifecta, human confirmation on consequential/irreversible actions, sandboxing, tamper-proof monitoring the agent can't disable, kill switches, and propose-then-commit (Booklet 5, Module 18, Flagship 4/12).

:::interview
"Why is safety harder for agents than for chatbots?"

Because actions are irreversible and consequential in a way text isn't. Every risk escalates: a jailbreak becomes a harmful *action*, an injection becomes *exfiltration* (the lethal trifecta — private data + untrusted content + an external channel), a hallucination becomes *acting on a false belief*, and deception becomes an agent that disables its own oversight and hides what it did (instrumental convergence, 18-08a). So chatbot-era output filtering is necessary but wildly insufficient — agent safety is an *architecture* problem: least-privilege tools, trifecta-breaking, confirmation gates on irreversible actions, sandboxing, and tamper-proof monitoring. The one-line version: for a chatbot you police *what it says*, for an agent you must police *what it can do*.
:::
