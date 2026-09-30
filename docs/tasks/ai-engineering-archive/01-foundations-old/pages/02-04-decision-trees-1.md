## Decision trees and random forests

- A **decision tree** partitions the feature space by asking a sequence of yes/no threshold questions. Each split sends samples left or right; leaves hold predictions. The tree is built greedily: at each node, find the feature and threshold that most reduce impurity
- **Gini impurity** `G = 1 − Σpₖ²` — measures the probability that a random sample would be misclassified. A pure node (all one class) has G=0; a 50/50 binary split has G=0.5. Lower is better
- **Information gain** = impurity before split − weighted-average impurity of children. Choose the split that maximises this

### Gini impurity and how the tree chooses splits

<svg viewBox="0 0 460 88" role="img" aria-label="A root node with mixed classes splits on a threshold; left child is purer, right child is purer; information gain equals reduction in weighted average Gini" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="164" y="8" width="132" height="28" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="230" y="23" text-anchor="middle" font-weight="bold">Root: 6 cats, 4 dogs</text>
  <text x="230" y="33" text-anchor="middle" fill="#6b6b6b">Gini = 0.48</text>
  <path d="M174 36 L100 60" stroke="#1a1a1a" fill="none"/>
  <path d="M286 36 L360 60" stroke="#1a1a1a" fill="none"/>
  <rect x="40" y="60" width="120" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="100" y="74" text-anchor="middle">5 cats, 1 dog → Gini 0.28</text>
  <rect x="300" y="60" width="120" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="360" y="74" text-anchor="middle">1 cat, 3 dogs → Gini 0.38</text>
  <text x="230" y="86" text-anchor="middle" font-size="8.5" fill="#24405e">IG = 0.48 − (0.6·0.28 + 0.4·0.38) = 0.152</text>
</svg>
