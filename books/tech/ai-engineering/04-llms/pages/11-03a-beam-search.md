## Beam search

- Greedy decoding (page 11-03) picks the single most likely token at each step — but the locally-best token can lead to a globally worse sentence. **Beam search** hedges: it keeps the top **b** partial sequences (the "beams") alive at every step, not just one.
- At each step, expand every beam by every possible next token, score the resulting sequences by total log-probability, and keep the best `b`. At the end, return the highest-scoring complete sequence.

<svg viewBox="0 0 318 78" role="img" aria-label="Beam search keeps the two best partial sequences at each step, exploring more paths than greedy" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <circle cx="24" cy="39" r="4" fill="#24405e"/>
  <circle cx="110" cy="22" r="4" fill="#1a3a2a"/><circle cx="110" cy="56" r="4" fill="#1a3a2a"/>
  <circle cx="210" cy="14" r="4" fill="#1a3a2a"/><circle cx="210" cy="34" r="4" fill="#1a3a2a"/><circle cx="210" cy="66" r="3" fill="#ddd"/>
  <circle cx="300" cy="24" r="4" fill="#c0392b"/>
  <path d="M28 38 L106 24" stroke="#bbb"/><path d="M28 40 L106 55" stroke="#bbb"/>
  <path d="M114 22 L206 15" stroke="#bbb"/><path d="M114 24 L206 33" stroke="#bbb"/>
  <path d="M214 15 L296 23" stroke="#c0392b"/>
  <text x="160" y="76" text-anchor="middle" fill="#6b6b6b">b=2 beams kept per step → best full path wins</text>
</svg>

- Beam search maximises sequence probability, so it shines where there is **one right answer**: machine translation, speech recognition, and other constrained tasks. `b`=4–8 is typical; `b`=1 is just greedy.

:::warn
Beam search is a poor fit for **open-ended generation**. Maximising probability makes text bland, generic, and repetitive — the "likely" sentence is the boring one, and beams collapse onto near-identical near-duplicates. For chat, stories, and brainstorming, sampling (temperature/top-p, page 11-03) gives better output. And beam search costs `b`× the compute. Match the decoder to the task: beams for closed tasks, sampling for creative ones.
:::
