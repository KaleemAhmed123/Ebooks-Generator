## Bounding Box & Spatial Extraction

Coordinates for every recognised token, so values can be extracted by position
and the source region highlighted in the interface.

The invoice total is "the number to the right of the word Total". Bounding boxes
make that rule expressible. A flat text dump does not.

### How it works

Good OCR returns each recognised token together with the rectangle it occupies
on the page. Keeping only the text and discarding the coordinates throws away
the document's entire structure.

Position is what makes rule-based extraction possible at all. "The total is the
number to the right of the word Total" is a precise instruction with coordinates
and meaningless without them. So is "the invoice number is in the top-right
quadrant", and so is "these two values are on the same row because their
vertical centres align".

<svg viewBox="0 0 460 62" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The token Total and the token for the amount share a vertical band with the amount immediately to the right, which is what identifies it as the total">
  <rect x="60" y="14" width="72" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="96" y="28" text-anchor="middle" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">Total</text>
  <rect x="152" y="14" width="86" height="20" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.3"/>
  <text x="195" y="28" text-anchor="middle" font-family="Consolas,monospace" font-size="9" fill="#c25a35">4,500</text>
  <path d="M56 10 H244" stroke="#c25a35" stroke-width="0.7" stroke-dasharray="3 2"/>
  <path d="M56 38 H244" stroke="#c25a35" stroke-width="0.7" stroke-dasharray="3 2"/>
  <text x="256" y="22" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">same vertical band,</text>
  <text x="256" y="34" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">immediately to the right</text>
  <text x="60" y="54" font-family="Georgia,serif" font-size="9.5" fill="#6b6b6b">from a flat text dump, none of this is recoverable</text>
</svg>

Coordinates also power the interface feature that makes document AI trustworthy:
click an extracted value and the source region highlights on the page image. A
reviewer verifies in a second instead of reading the document.

### In practice

Normalise coordinates against page dimensions rather than storing absolute
pixels, so the same rules work across resolutions and page sizes without being
rewritten for each scanner.

Store the page number alongside them. A rule that finds the right region on the
wrong page is a subtle bug that never appears in testing, because test documents
are one page and real ones are eleven.
