### 3. Establish the Base Cases

- What are the smallest possible subproblems? The ones so trivial they don't require any calculation?
- If you don't define base cases, your recursive transition will drill down into negative numbers or infinity and crash.
- *Example:* `dp[0] = 1` (There is 1 way to be at the ground floor: do nothing). `dp[1] = 1` (There is 1 way to reach the first step: take 1 step).

:::mint
<svg viewBox="0 0 470 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The DP Framework visualization">
  <!-- State -->
  <rect x="20" y="50" width="100" height="40" fill="#e2fcf3" stroke="#1d4e89" stroke-width="2" />
  <text x="35" y="75" class="s" fill="#1d4e89">1. State</text>
  <text x="70" y="35" class="s">"What am I solving?"</text>
  
  <path d="M125 70 L165 70" stroke="#12121a" stroke-width="2" marker-end="url(#arrow)" />

  <!-- Transition -->
  <rect x="175" y="50" width="120" height="40" fill="#f4f4f4" stroke="#12121a" stroke-width="2" />
  <text x="185" y="75" class="s">2. Transition</text>
  <text x="235" y="115" class="s">"How do subproblems combine?"</text>
  
  <path d="M300 70 L340 70" stroke="#12121a" stroke-width="2" marker-end="url(#arrow)" />
  
  <!-- Base Cases -->
  <rect x="350" y="50" width="100" height="40" fill="#f4f4f4" stroke="#12121a" stroke-width="2" />
  <text x="360" y="75" class="s">3. Base Cases</text>
  <text x="400" y="35" class="s">"Where does it stop?"</text>
</svg>
:::

### The Process

When faced with a DP problem in an interview, do not start writing code.
Write this on the board:
1. `State:`
2. `Transition:`
3. `Base Cases:`

Only when you have filled all three out in mathematical notation are you allowed to touch the keyboard.
