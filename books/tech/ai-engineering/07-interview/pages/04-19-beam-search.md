## What is beam search, and when does it beat plain sampling?

- **Beam search** keeps the **b most probable partial sequences** at each step (the "beams"), expanding all of them and pruning back to the top b. It approximately finds a high-probability *whole sequence*, not just high-probability next tokens.
- It beats greedy/sampling on **closed-ended** tasks where there's a single best answer and you want the globally likeliest output: machine translation, speech recognition, constrained generation.
- It's **bad for open-ended generation**: maximising sequence probability yields bland, repetitive, generic text (the "likelihood trap") and kills diversity. That's why chat/creative models use sampling, not beams.
- Cost: b× the compute and memory of greedy, and it needs length normalisation or it over-prefers short sequences.

:::interview
What's really being tested:

that beam search optimises *sequence* likelihood (good for translation/ASR) but produces dull text for open-ended generation — matching decoder to task.
:::
