## Safety Classifier

A separate model or ruleset screening input before it reaches the main model and
output before it reaches the user, running as code rather than as an
instruction.

The separation is the entire point. An instruction inside a prompt is a request
the model weighs against everything else in its context, including whatever an
attacker managed to put there. A rule that can be argued with is not a control.
The classifier's verdict is not negotiable by anything in the context.

<svg viewBox="0 0 460 82" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="User input passes through an input classifier before reaching the model, and the model output passes through an output classifier before reaching the user">
  <rect x="4" y="18" width="60" height="28" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="34" y="36" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">user</text>
  <path d="M64 32 H84" stroke="#1a1a1a" stroke-width="1.2"/><path d="M84 32 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="86" y="18" width="88" height="28" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/>
  <text x="130" y="36" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#c25a35">input check</text>
  <path d="M174 32 H194" stroke="#1a1a1a" stroke-width="1.2"/><path d="M194 32 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="196" y="18" width="68" height="28" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="230" y="36" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">model</text>
  <path d="M264 32 H284" stroke="#1a1a1a" stroke-width="1.2"/><path d="M284 32 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="286" y="18" width="94" height="28" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/>
  <text x="333" y="36" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#c25a35">output check</text>
  <path d="M380 32 H400" stroke="#1a1a1a" stroke-width="1.2"/><path d="M400 32 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="402" y="18" width="54" height="28" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="429" y="36" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">user</text>
  <text x="230" y="70" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">the shaded boxes are code; the middle one is not</text>
</svg>

**Measure the classifier's false positive rate as carefully as its recall.** One
that blocks every violation while also blocking a third of legitimate requests
has broken the product, and the dashboard will look excellent, because it counts
catches and not what it destroyed.

## Seed & Reproducibility

Temperature 0 and a fixed seed cut variance sharply. They do not remove it.
Anthropic's API reference states it outright: even with a temperature of 0.0,
the results will not be fully deterministic.

Three things break exact reproducibility. Providers update models behind a
stable version identifier. Floating-point addition on GPUs is not associative,
so a result depends on the order operations happen to finish. And on a batched
server the numerics shift with whatever else shared the batch, which is outside
your control entirely.

The bill lands on evaluation. An exact-match test can go red on an
infrastructure change with no model change, and nothing in your system moved.
Score on semantic equivalence or a rubric instead, except where the output
really is a fixed structure.

**Determinism is a debugging aid, not a correctness property.** Temperature 0
reproduces the model's most likely answer, consistently, including when it is
wrong.
