## Adversarial training and circuit breakers

- Classifiers screen attacks at runtime (18-22); the complementary approach is to make the *model itself* more robust, so fewer attacks work in the first place. Two techniques lead.
- **Adversarial training:** generate successful jailbreaks (with PAIR-style attackers, 18-15), add them to training with the correct refusal, retrain, repeat. The model learns to resist the attack families it was trained against.

<svg viewBox="0 0 360 78" role="img" aria-label="A loop: attack the model, collect successful jailbreaks, retrain on them with refusals, model gets more robust" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="16" y="30" width="60" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="46" y="42" text-anchor="middle" font-size="6">attack</text>
  <rect x="104" y="30" width="80" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="144" y="42" text-anchor="middle" font-size="6">collect jailbreaks</text>
  <rect x="212" y="30" width="70" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="247" y="42" text-anchor="middle" font-size="6">retrain w/ refusal</text>
  <rect x="308" y="30" width="42" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="329" y="42" text-anchor="middle" font-size="6">robust</text>
  <path d="M76 39 L102 39 M184 39 L210 39 M282 39 L306 39" stroke="#888" marker-end="url(#at)"/>
  <path d="M247 48 Q247 66 140 66 Q46 66 46 50" fill="none" stroke="#888" stroke-dasharray="3 2" marker-end="url(#at)"/>
  <defs><marker id="at" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Circuit breakers** (representation engineering, Zou et al. 2024) take a deeper approach: instead of training refusals on the output, they interrupt the model's *internal representations* when they head toward harmful territory — so the model becomes unable to *produce* the harmful content, not just trained to decline it. Aims to be robust to unseen attacks, not just trained ones.
- **The limit of adversarial training** is generalisation: it hardens against the attack *families* seen in training, but a genuinely novel attack (a new encoding, a new jailbreak class) can still land. It raises the bar; it doesn't close the door — which is why runtime classifiers and defense-in-depth remain necessary.

:::note
The two approaches sit at different layers of the safety stack (18-22's rings): adversarial training and circuit breakers harden the *model*, classifiers screen at the *gateway*, and architecture (least privilege, trifecta-breaking) contains the *blast radius*. None alone is sufficient — adversarial training generalises imperfectly, classifiers have false negatives, architecture can't stop a harmful *answer*. Robustness research makes the model a smaller target; it does not remove the need for the layers around it. "Harden the model *and* wrap it" is the mature posture.
:::
