## Bounding Box & Spatial Extraction

Coordinates for every recognised token, so values can be extracted by position.
Tesseract's TSV output gives `left top width height conf` for each word,
alongside its page, block, paragraph, line and word numbers. Keep only the text
and you have thrown the document's structure away.

<svg viewBox="0 0 460 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The token Total and the token for the amount share a vertical band with the amount immediately to the right, which is what identifies it as the total">
  <rect x="60" y="14" width="72" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="96" y="28" text-anchor="middle" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">Total</text>
  <rect x="152" y="14" width="86" height="20" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/>
  <text x="195" y="28" text-anchor="middle" font-family="Consolas,monospace" font-size="9" fill="#c25a35">4,500</text>
  <path d="M56 10 H244" stroke="#c25a35" stroke-width="0.7" stroke-dasharray="3 2"/>
  <path d="M56 38 H244" stroke="#c25a35" stroke-width="0.7" stroke-dasharray="3 2"/>
  <text x="256" y="22" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">same vertical band,</text>
  <text x="256" y="34" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">immediately to the right</text>
  <text x="60" y="56" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">from a flat text dump, none of this is recoverable</text>
</svg>

Position is what makes a rule expressible at all. "The total is the number to
the right of the word Total" is precise with coordinates and meaningless
without. Coordinates also drive click-to-highlight review, which is what makes
document AI trustworthy to the person signing off on it.

**Normalise against page dimensions and store the page number.** Absolute pixels
break across scanners. A rule that finds the right region on the wrong page
never shows up in testing, because test documents are one page and real ones are
eleven.

## Chain of Thought

*CoT*

Having the model produce intermediate reasoning steps before its answer, rather
than emitting the answer directly. Wei et al. (2022) showed that eight exemplars
containing their own worked reasoning lifted a 540-billion-parameter model to
state-of-the-art accuracy on GSM8K, beating a fine-tuned GPT-3 with a verifier.

Current models do this without being asked. Claude's adaptive thinking decides
how much reasoning to spend per request, steered by an `effort` setting. What
you control is the effort; the reasoning tokens are billed either way.

**The stated reasoning is not a log of the computation.** It is generated text,
produced by the same sampling that produces the answer, and a model can reach a
correct answer through wrong stated steps or the reverse. Do not treat it as an
audit trail, and do not show it to a user as an explanation.
