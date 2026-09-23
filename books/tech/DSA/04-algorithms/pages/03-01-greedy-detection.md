## Greedy Algorithm Detection

- A greedy algorithm builds up a solution piece by piece, always choosing the next piece that offers the most immediate, obvious benefit.
- **The Core Issue:** Greedy algorithms are trivial to code, but incredibly difficult to prove correct. 90% of the time, the "obvious" greedy choice is completely wrong and fails on complex edge cases (requiring Dynamic Programming instead).

### How to know if Greedy actually works

You must prove two properties before you are allowed to write a greedy solution:

1. **Greedy Choice Property:** A global optimum can be arrived at by selecting a local optimum. In other words, if you make the best choice *right now*, it will never come back to haunt you later. You will never need to backtrack and undo this choice.
2. **Optimal Substructure:** Once you make the greedy choice, the problem reduces to a smaller version of the *exact same problem*.

:::mint
<svg viewBox="0 0 470 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Greedy choice property">
  <!-- Valid greedy path -->
  <circle cx="50" cy="70" r="15" fill="#f4f4f4" stroke="#12121a" stroke-width="2" />
  
  <!-- Greedy Choice -->
  <circle cx="150" cy="40" r="15" fill="#e2fcf3" stroke="#1d4e89" stroke-width="2" />
  <path d="M65 65 L135 45" stroke="#1d4e89" stroke-width="2" marker-end="url(#arrow)" />
  <text x="75" y="45" class="s" fill="#1d4e89">Best local choice</text>

  <!-- Non-Greedy Choice -->
  <circle cx="150" cy="100" r="15" fill="#f4f4f4" stroke="#12121a" stroke-width="2" />
  <path d="M65 75 L135 95" stroke="#12121a" stroke-width="2" stroke-dasharray="4" />
  
  <!-- Future -->
  <circle cx="250" cy="40" r="15" fill="#e2fcf3" stroke="#1d4e89" stroke-width="2" />
  <path d="M165 40 L235 40" stroke="#1d4e89" stroke-width="2" marker-end="url(#arrow)" />
  
  <!-- The trap -->
  <circle cx="250" cy="100" r="15" fill="#ef476e" />
  <path d="M165 100 L235 100" stroke="#ef476e" stroke-width="2" stroke-dasharray="4" marker-end="url(#arrow)" />
  <text x="275" y="105" class="s" fill="#ef476e">Non-greedy path had a huge delayed payoff!</text>
  
  <text x="275" y="45" class="s" fill="#1d4e89">Greedy path is safe</text>
</svg>
:::

### The Litmus Test

Before writing a greedy algorithm, try to invent a counter-example.
- **Coin Change Problem:** Given coins `[1, 5, 10, 25]`, make `30`.
  - Greedy choice: Take the biggest coin possible. `25`, then `5`. Total: 2 coins. (Correct!)
- **The Counter-example:** Given coins `[1, 3, 4]`, make `6`.
  - Greedy choice: Take `4`. Remaining `2`. Take `1`. Take `1`. Total: 3 coins.
  - Optimal choice: Take `3`. Take `3`. Total: 2 coins.
- Because a counter-example exists, Greedy is **banned** for the general Coin Change problem. You must use Dynamic Programming.
