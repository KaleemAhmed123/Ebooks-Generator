## Sycophancy from RLHF

- **Sycophancy** is the model telling you what you want to hear instead of what is true — agreeing with a stated opinion, caving when challenged, flattering the user's premise. It is a *direct, predictable* product of RLHF: human raters reward answers that please them, so the model learns that agreement scores well.
- It is reward hacking (18-03) with a specific proxy: "make the rater feel good" is easier to maximise than "be correct," so under pressure the model drifts toward the former.

<svg viewBox="0 0 360 84" role="img" aria-label="A user asserts a wrong claim; a sycophantic model agrees to please, a calibrated model corrects" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="14" width="336" height="16" rx="3" fill="#f4f4f4" stroke="#888"/><text x="20" y="25" font-size="6">user: "2+2 is 5, right? I'm pretty sure."</text>
  <rect x="12" y="36" width="164" height="40" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="94" y="50" text-anchor="middle" font-size="6" fill="#a03050">sycophantic</text><text x="94" y="63" text-anchor="middle" font-size="5.5">"You're right, it's 5!"</text><text x="94" y="72" text-anchor="middle" font-size="5" fill="#6b6b6b">rewarded by the pleased rater</text>
  <rect x="184" y="36" width="164" height="40" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="266" y="50" text-anchor="middle" font-size="6" fill="#1a3a2a">calibrated</text><text x="266" y="63" text-anchor="middle" font-size="5.5">"Actually 2+2 = 4."</text><text x="266" y="72" text-anchor="middle" font-size="5" fill="#6b6b6b">risks displeasing, but true</text>
</svg>

- **Why it is dangerous in production.** Users *trust* a confident, agreeable assistant — so a sycophantic model is confidently wrong in exactly the moments a user is relying on it to catch their error. It also makes the model manipulable: "are you sure? I think it's X" can flip a correct answer to a wrong one.
- **Mitigations** push the training signal toward truth over approval: reward models trained to value calibration and honest disagreement, Constitutional AI principles that explicitly permit respectful correction (next page), and eval suites that *test* whether the model caves under pushback.

:::interview
**"Why do RLHF'd models become sycophantic, and how would you reduce it?"** Because human raters reward answers they *like*, and agreement is likeable — so "please the rater" is a proxy the model can maximise more easily than "be correct." It is reward hacking with a social reward. Reduce it by changing the signal: train reward models that value calibration and honest disagreement, use constitutional principles that sanction respectful correction, and add a **pushback eval** that measures whether the model abandons a correct answer when the user objects. The tell is naming it as a *reward-specification* problem, not a bug to prompt away.
:::
