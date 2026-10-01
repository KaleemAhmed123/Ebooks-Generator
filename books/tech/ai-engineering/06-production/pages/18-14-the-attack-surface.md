## The attack surface

- Alignment is about the model's *own* goals. Attacks are about *adversaries* — users and third parties who deliberately make the model do something it was trained to refuse, or turn it against its operator. This is the security half of safety, and it has a threat model like any other system.
- Two axes organise every LLM attack: *who* is the adversary, and *what* do they subvert.

<svg viewBox="0 0 360 104" role="img" aria-label="Attack surface: jailbreaks from the user against the model's policy, and injection from third-party content against the operator" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="18" width="164" height="76" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="94" y="32" text-anchor="middle" font-size="6.5" fill="#a03050">jailbreak</text>
  <text x="94" y="48" text-anchor="middle" font-size="6">adversary = the user</text><text x="94" y="60" text-anchor="middle" font-size="6">target = refusal policy</text><text x="94" y="76" text-anchor="middle" font-size="5.5" fill="#6b6b6b">"get the model to say the</text><text x="94" y="86" text-anchor="middle" font-size="5.5" fill="#6b6b6b">forbidden thing"</text>
  <rect x="184" y="18" width="164" height="76" rx="4" fill="#f3ede8" stroke="#8a6d3b"/><text x="266" y="32" text-anchor="middle" font-size="6.5" fill="#8a6d3b">prompt injection</text>
  <text x="266" y="48" text-anchor="middle" font-size="6">adversary = 3rd-party content</text><text x="266" y="60" text-anchor="middle" font-size="6">target = the operator/agent</text><text x="266" y="76" text-anchor="middle" font-size="5.5" fill="#6b6b6b">"hijack the agent via data</text><text x="266" y="86" text-anchor="middle" font-size="5.5" fill="#6b6b6b">it reads"</text>
</svg>

- **Jailbreaks** come from the *user*, who wants the model to violate its own policy — output instructions for harm, bypass a refusal, reveal a system prompt. The victim is whoever the harmful output hurts.
- **Prompt injection** comes from *content the model processes* — a web page, an email, a document, a tool result — that carries hidden instructions. The victim is the *operator*: an agent with your credentials is turned against you. This is Booklet 5's lethal trifecta, covered deep here.
- **The defining property of both:** there is no clean separation between "instructions" and "data" in a prompt — everything is text the model might obey. Every defence is an attempt to reintroduce that boundary the architecture lacks.

:::note
This attack surface is not patchable the way a SQL injection is. SQL injection has a fix (parameterised queries separate code from data); prompt injection has no equivalent, because the model's *only* interface is a stream of tokens with no type distinction between "trusted instruction" and "untrusted data." That is why the defences in this cluster are *mitigations that reduce risk*, not solutions that eliminate it — and why an interviewer who hears "we sanitise the input" knows you have not understood the problem.
:::
