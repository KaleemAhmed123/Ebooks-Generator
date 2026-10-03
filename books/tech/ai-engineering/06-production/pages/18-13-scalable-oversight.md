## Scalable oversight and weak-to-strong

- Every alignment method so far assumed the *supervisor* (human rater, reward model, AI critic) is at least as capable as the model being trained. **Scalable oversight** asks the question that breaks when models surpass us: *how do you supervise a model smarter than you, on tasks you cannot fully evaluate yourself?*
- If a model writes code, a proof, or an analysis you cannot check, "reward the good answer" has no ground truth — you cannot tell which answer is good.

<svg viewBox="0 0 360 84" role="img" aria-label="A weak supervisor trains a strong model, which generalises beyond the weak supervisor's own ability" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="34" width="80" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="54" y="44" text-anchor="middle" font-size="6">weak supervisor</text><text x="54" y="53" text-anchor="middle" font-size="5.5" fill="#6b6b6b">imperfect labels</text>
  <rect x="140" y="30" width="90" height="32" rx="3" fill="#24405e"/><text x="185" y="42" text-anchor="middle" font-size="6" fill="#fff">strong model</text><text x="185" y="52" text-anchor="middle" font-size="5.5" fill="#cdd">trained on them</text>
  <rect x="270" y="34" width="78" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="309" y="44" text-anchor="middle" font-size="5.5">generalises PAST</text><text x="309" y="53" text-anchor="middle" font-size="5.5">the supervisor</text>
  <path d="M94 46 L138 46" stroke="#888" marker-end="url(#so)"/><path d="M230 46 L268 46" stroke="#888" marker-end="url(#so)"/>
  <defs><marker id="so" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Weak-to-strong generalization** (OpenAI, 2023) is the first empirical probe: can a *weak* supervisor elicit the full capability of a *strong* model? They fine-tuned a strong model on labels from a weaker one and found it generalised *beyond* the weak supervisor's own accuracy — hopeful evidence that imperfect oversight can still steer a more capable model, though far from fully recovering its capability.
- **The other approaches** decompose the checking so a weaker overseer can verify pieces they could not judge whole: *debate* (two strong models argue, a weaker judge decides), *recursive reward modelling* (use AI help to evaluate), *task decomposition* (break the unverifiable task into verifiable sub-claims).

:::interview
"How do you align a model that is smarter than the people training it?"

This is scalable oversight, and there is no solved answer — but name the approaches. **Weak-to-strong**: imperfect supervision can partially elicit a stronger model's capability (shown empirically, incompletely). **Debate / decomposition**: have strong models argue or break a task into pieces a weaker judge *can* verify, so oversight scales by checking parts instead of the whole. **AI-assisted evaluation** (RLAIF, critique models): amplify the supervisor with the models themselves, carefully, since they inherit its blind spots. The honest framing — "this is an open problem and here are the leading partial answers" — is stronger than pretending it is solved.
:::
