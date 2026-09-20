# Module 5 - Back-of-the-envelope estimation

## The method

- Every interview estimation follows three steps: **assume**, **multiply**, **sanity-check**
- Write the inputs you assumed, do the arithmetic in powers of ten, then compare the answer to something you already know

### Step by step

- **State your assumptions.** "100M registered users, 10% **DAU** (daily active users), each visits 5 times and clicks 3 items per visit." Write them down. They are your answer's error budget
- **Multiply in powers of ten.** 10M DAU × 5 × 3 = 150M clicks/day ≈ 1.5 × 10⁸. Do not reach for a calculator; round everything to the nearest power of ten and multiply the exponents
- **Sanity-check.** "150M clicks/day ≈ 1,700/s. One well-tuned Postgres box handles that; a fleet is not needed yet." Compare the answer to something you have actually run. If it is wildly off, the assumption is wrong, not the arithmetic

### The failure

- Precision theatre: "12,731.4 QPS" from inputs that were guessed. The answer has five significant digits but only one of them is meaningful
- The point of estimation is the order of magnitude, not the decimal. "About 2,000/s" is the right answer. "12,731.4" is a wrong answer wearing a lab coat
