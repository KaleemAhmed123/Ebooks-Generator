## Reciprocal Rank Fusion

*RRF*

Merging ranked lists by rank position rather than by raw score, so incomparable
scoring scales never have to be normalised.

BM25 scores run 0 to 40 with no fixed ceiling; cosine runs roughly −1 to 1.
Normalising them is fragile. RRF uses positions and works with almost no tuning.

### How it works

Two retrievers give two ranked lists and you need one. Adding the scores does
not work, because they are not on the same scale — whichever produces larger
numbers dominates the merge regardless of how confident it actually was.

Normalising is possible and fragile: it depends on the score range in *this*
result set, so it shifts from query to query, and the merge behaves differently
on Tuesday than on Monday for no visible reason.

**RRF throws the scores away entirely and uses only positions.** A document's
contribution from each list is one divided by a constant plus its rank. Being
first is worth a lot, being twentieth is worth little, and how confident the
retriever claimed to be is irrelevant.

Documents ranked well by both lists rise to the top, which is precisely the
behaviour you wanted.

### In practice

**Its main virtue is that it works well immediately with essentially no
tuning**, which is rare enough to be worth taking advantage of.

The constant — conventionally around 60 — softens the difference between the top
few positions, so one retriever's first result does not automatically win the
merge.

If you later need to favour one retriever over the other, add a weight per list.
Do not reach back for score normalisation; that is the problem RRF exists to
avoid.
