## Trie with precomputed top-k

- The standard data structure for prefix matching is a **Trie** (Prefix Tree)
- Each node represents a character. To find completions for "app", you walk `a` → `p` → `p`, and then traverse all child nodes to find the most popular words
- **The optimization:** Traversing children is too slow at runtime. Instead, *every single node* pre-stores a list of its top-k (e.g., top 5) completed strings
- When the user types "app", the server walks to the "p" node, and simply returns the hardcoded list `['apple', 'app', 'application']` in O(1) time

<svg viewBox="0 0 460 110" role="img" aria-label="Trie where each node caches the top-K completed search terms" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <circle cx="50" cy="55" r="20" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="50" y="58" text-anchor="middle" font-weight="bold">Root</text>
  
  <circle cx="150" cy="55" r="20" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="150" y="58" text-anchor="middle" font-weight="bold" fill="#1d4e89">a</text>
  <text x="150" y="90" text-anchor="middle" font-size="6" fill="#1d4e89">[apple, art]</text>
  
  <circle cx="250" cy="20" r="20" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="250" y="23" text-anchor="middle" font-weight="bold" fill="#1d4e89">p</text>
  <text x="250" y="50" text-anchor="middle" font-size="6" fill="#1d4e89">[apple, app]</text>
  
  <circle cx="250" cy="90" r="20" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="250" y="93" text-anchor="middle" font-weight="bold" fill="#1d4e89">r</text>
  <text x="250" y="120" text-anchor="middle" font-size="6" fill="#1d4e89">[art]</text>
  
  <circle cx="350" cy="20" r="20" fill="#fce4e2" stroke="#b8541a"/>
  <text x="350" y="23" text-anchor="middle" font-weight="bold" fill="#b8541a">p</text>
  <text x="350" y="50" text-anchor="middle" font-size="6" fill="#b8541a">[apple, app]</text>
  
  <path d="M70 55 L130 55" stroke="#1a1a1a" fill="none" stroke-width="1.5"/>
  <path d="M165 45 L235 25" stroke="#1d4e89" fill="none" stroke-width="1.5"/>
  <path d="M165 65 L235 85" stroke="#1d4e89" fill="none" stroke-width="1.5"/>
  <path d="M270 20 L330 20" stroke="#b8541a" fill="none" stroke-width="1.5"/>
</svg>

### The failure

- Recomputing the top 5 results by walking the entire subtree of the Trie on every request. If the user types "a", traversing the entire dictionary of "a" words to find the 5 most popular is a massive CPU spike.

:::interview
Your Trie is consuming too much CPU. It is walking millions of child nodes to find the most popular words starting with "a". How do you fix it?

You must precompute the Top-K results and store them directly inside the node for "a". When the user types "a", you return the cached array instantly in O(1) time.
:::\n