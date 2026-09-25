## Choose the Opposite Bit <span class="lv lv3"></span>

- **What it is:** A **binary trie** stores numbers as root-to-leaf paths of bits, highest bit first. To maximise `x XOR y`, walk from the root and at every level take the child whose bit is the **opposite** of x's bit when it exists. Module 07 (01-11) names the transformation; this page is the machinery
- **Signal:** "maximum XOR of two numbers / of a subarray / with an element ≤ m", "count pairs whose XOR lies in a range", n up to 10⁵–2·10⁵ so O(n²) pairs are too many
- **Why it works:** A higher bit outweighs all lower bits together: 2ᵇ > 2ᵇ − 1. So winning bit b is always worth more than anything below it, and the greedy choice per level is optimal. One query costs one root-to-leaf walk: 31 steps for values below 2³¹
