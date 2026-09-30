## Speech recognition (ASR)

- **Automatic speech recognition (ASR)** turns spoken audio into text. The hard part: the audio and the text do not line up. A one-second word and a three-second word are both a handful of letters.
- Early systems needed hand-aligned data (which sound goes with which letter). Two ideas removed that need.
- **CTC** (connectionist temporal classification) lets the model output a letter at every audio frame plus a "blank", then collapses repeats and blanks into the final text — so it learns the alignment itself.

<svg viewBox="0 0 330 90" role="img" aria-label="Audio frames each produce a letter or blank, then repeated letters and blanks collapse into the word cat" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <g fill="#e8f4fd" stroke="#24405e"><rect x="12" y="20" width="26" height="20"/><rect x="40" y="20" width="26" height="20"/><rect x="68" y="20" width="26" height="20"/><rect x="96" y="20" width="26" height="20"/><rect x="124" y="20" width="26" height="20"/><rect x="152" y="20" width="26" height="20"/></g>
  <g text-anchor="middle"><text x="25" y="34">c</text><text x="53" y="34">c</text><text x="81" y="34">_</text><text x="109" y="34">a</text><text x="137" y="34">_</text><text x="165" y="34">t</text></g>
  <path d="M186 30 L216 30" stroke="#1a1a1a" marker-end="url(#as)"/><text x="201" y="24" text-anchor="middle" fill="#6b6b6b">collapse</text>
  <rect x="222" y="18" width="50" height="24" rx="3" fill="#1a3a2a"/><text x="247" y="34" text-anchor="middle" fill="#fff">"cat"</text>
  <defs><marker id="as" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- The other approach is **sequence-to-sequence**: an encoder reads the audio, a decoder writes the text token by token, like translation. This is what Whisper uses (next page).

:::warn
ASR is scored by **word error rate (WER)** — the fraction of words wrong, counting insertions, deletions, and substitutions. Beware: WER punishes a misplaced comma or a spelled-out number ("5" vs "five") as an error, so a low-WER model can still read fine to a human, and vice versa.
:::
