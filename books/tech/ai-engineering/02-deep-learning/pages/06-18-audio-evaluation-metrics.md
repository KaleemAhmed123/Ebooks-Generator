## Audio evaluation metrics

- You cannot improve what you cannot measure. Each audio task has its own scorecard.
- **ASR** — **word error rate (WER)**: the fraction of words wrong. Lower is better; 0 is perfect.
- **Speaker verification** — **equal error rate (EER)**: the threshold where false accepts equal false rejects. One number summarising the accept/reject trade.
- **Generation (TTS, music)** — objective scores exist, but the ground truth is a **MOS** (mean opinion score): human listeners rate naturalness from 1 to 5. Audio quality is ultimately judged by ears.

<svg viewBox="0 0 330 76" role="img" aria-label="Three task-metric pairs: ASR with WER, speaker verification with EER, generation with MOS from human raters" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="8" y="20" width="96" height="36" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="56" y="36" text-anchor="middle" font-weight="bold">ASR</text><text x="56" y="49" text-anchor="middle" fill="#6b6b6b">WER ↓</text>
  <rect x="116" y="20" width="96" height="36" rx="3" fill="#cfe0f0" stroke="#24405e"/><text x="164" y="36" text-anchor="middle" font-weight="bold">verification</text><text x="164" y="49" text-anchor="middle" fill="#6b6b6b">EER ↓</text>
  <rect x="224" y="20" width="98" height="36" rx="3" fill="#1a3a2a"/><text x="273" y="36" text-anchor="middle" fill="#fff" font-weight="bold">generation</text><text x="273" y="49" text-anchor="middle" fill="#cfe0d5">MOS ↑ (humans)</text>
</svg>

:::warn
Objective generation metrics correlate only loosely with what people actually like — a model can win on a spectral distance score and still sound robotic. For anything humans will hear, budget for real listening tests. The number that ships the product is the one from ears, not the automatic proxy.
:::
