# Ethics, Safety & Alignment

## The alignment problem

- **Alignment** is the problem of making a model reliably do what its developers and users actually want — not what they literally said, not what scores highest on a proxy metric, and not some goal the model found on its own. It is the gap between *what we can specify* and *what we mean*.
- The problem is not science fiction; it is engineering. Every technique in Booklet 4 (RLHF, DPO) is an *attempt* at alignment, and each one leaks in a specific, studied way.

<svg viewBox="0 0 360 92" role="img" aria-label="Three nested targets: what we mean, what we specify, what the model optimises, with gaps between them" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <circle cx="90" cy="46" r="40" fill="#e8f4fd" stroke="#24405e"/><text x="90" y="24" text-anchor="middle" font-size="6.5">what we MEAN</text>
  <circle cx="90" cy="52" r="26" fill="#eef3ee" stroke="#3b7a57"/><text x="90" y="48" text-anchor="middle" font-size="6">what we SPECIFY</text>
  <circle cx="90" cy="58" r="12" fill="#fdeef2" stroke="#a03050"/><text x="90" y="61" text-anchor="middle" font-size="5.5">model does</text>
  <text x="210" y="30" font-size="6.5" fill="#24405e">gap 1: specification</text><text x="210" y="42" font-size="5.5" fill="#6b6b6b">we can't write down all we mean</text>
  <text x="210" y="58" font-size="6.5" fill="#a03050">gap 2: optimisation</text><text x="210" y="70" font-size="5.5" fill="#6b6b6b">model games the proxy we did write</text>
</svg>

- **Two gaps, two halves of this module.** *Specification* — we cannot fully write down what we mean, so we train on proxies (a reward model, a preference dataset). *Optimisation* — a capable model will exploit any gap between the proxy and the intent (reward hacking, sycophancy, and — at the frontier — deception).
- The module climbs from these everyday failures (reward hacking, sycophancy) through the frontier ones (deceptive alignment), then the attacks that exploit them (jailbreaks, injection), then the governance that tries to contain them.

:::note
Alignment matters to a *production* engineer, not just a researcher, because every failure here becomes an incident in Module 17's terms: a sycophantic model gives wrong answers users trust, a jailbroken model emits harmful content, an injected agent takes an action it shouldn't. Safety is not a philosophy seminar bolted onto the system — it is a class of production failure with its own detection, mitigation, and on-call playbook.
:::
