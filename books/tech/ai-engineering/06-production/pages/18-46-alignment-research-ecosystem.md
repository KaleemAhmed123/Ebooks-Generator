## The alignment research ecosystem

- Safety is not one lab's internal team — it is an ecosystem of labs, independent orgs, government bodies, and training programs that produce the evaluations, techniques, and oversight this module has drawn on. Knowing the map helps you place a claim and find primary sources.

<svg viewBox="0 0 360 98" role="img" aria-label="The alignment ecosystem: lab safety teams, independent evaluators, government institutes, and talent pipelines" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="16" width="164" height="34" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="94" y="28" text-anchor="middle" font-size="6" fill="#24405e">lab safety teams</text><text x="94" y="40" text-anchor="middle" font-size="5.5" fill="#6b6b6b">Anthropic · OpenAI · DeepMind</text>
  <rect x="184" y="16" width="164" height="34" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="266" y="28" text-anchor="middle" font-size="6" fill="#a03050">independent evaluators</text><text x="266" y="40" text-anchor="middle" font-size="5.5" fill="#6b6b6b">METR · Apollo · Redwood</text>
  <rect x="12" y="56" width="164" height="34" rx="4" fill="#f3ede8" stroke="#8a6d3b"/><text x="94" y="68" text-anchor="middle" font-size="6" fill="#8a6d3b">government institutes</text><text x="94" y="80" text-anchor="middle" font-size="5.5" fill="#6b6b6b">UK AISI · US CAISI · EU AI Office</text>
  <rect x="184" y="56" width="164" height="34" rx="4" fill="#eef3ee" stroke="#3b7a57"/><text x="266" y="68" text-anchor="middle" font-size="6" fill="#3b7a57">talent + academia</text><text x="266" y="80" text-anchor="middle" font-size="5.5" fill="#6b6b6b">MATS · university labs</text>
</svg>

- **Who does what.** *Lab safety teams* build alignment techniques and run internal evals. *Independent evaluators* (METR for autonomy, Apollo for deception, Redwood for control) provide the outside check. *Government institutes* (UK AISI, US CAISI, EU AI Office) turn voluntary commitments toward binding oversight. *Talent pipelines* (MATS, academic labs) train the researchers.
- **Why the map matters to an engineer.** When you read "the model is safe" or "this attack works," the *source* tells you how much to trust it — a lab's own claim, an independent evaluator's adversarial test, or a regulator's assessment carry different weight. This is the same primary-source discipline the whole series insists on, applied to safety claims that are fast-moving and often marketed.

:::note
This closes the module's arc: alignment failures (reward hacking, sycophancy) → the deception frontier → attacks → governance → the *institutions* that measure and enforce it all. For a production engineer the ecosystem is where the trustworthy primary sources live — papers, system cards, evaluation reports — so when a safety claim lands on your desk, you know who made it, whether an independent party checked it, and where to verify it. Safety, like the rest of this series, is a practice of tracing claims to primary sources, not trusting the headline.
:::
