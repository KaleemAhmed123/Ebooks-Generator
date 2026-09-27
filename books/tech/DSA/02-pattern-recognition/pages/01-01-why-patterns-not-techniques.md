# Chapter 1 - Reading the Structure

## Why patterns, not techniques <span class="lv lv1"></span>

- **A technique** is a routine: two indices, a window, a halving loop. **A pattern** is the structure in the input that makes one routine correct. Sorted order lets a pair be discarded unchecked; a condition that survives shrinking lets a window slide
- An interview problem arrives without its tag. Knowing *how* to write a window does not say *when* one applies. The structure does
- Module 01 turns a brute force into a fast algorithm with four questions: can we remember it, eliminate candidates, preprocess, exploit monotonicity (Module 01, 02-04 to 02-07). This book catalogues the 54 answers those questions keep producing (01-02)

### How a page is read

- **What:** the mechanism, in one line
- **Spot it:** words in the statement that point here, and "→" to the page for the look-alike that fails
- **Why:** the invariant. If you cannot say it, you cannot defend the code
- **Watch out:** the bug a strong candidate still writes, with an input small enough to check by hand
- **Also solves:** more problems the same mechanism answers, linked

### From statement to page

- Name the input's shape and the question, and the chart gives the page (01-04)
- Or find the pattern in the list of 54, grouped by chapter (01-02)
- Confirm on the page: its "Spot it" line must fit, and its "→" look-alike must not

:::interview
"You have solved 300 problems and still stall on a new one. Why?" — Because the 300 were filed by technique. A new problem hides the technique, not the structure: sorted input, a condition monotone in a window, values bounded by n. I read the constraints and write the brute force first, name the structure that removes its waste, and only then pick the routine that exploits it.
:::
