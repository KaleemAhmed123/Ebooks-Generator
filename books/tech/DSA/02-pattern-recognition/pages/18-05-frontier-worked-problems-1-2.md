## Frontier worked problems 🟡 - continued

```ts
while (frontier.length > 0) {
    const nextLevel: string[] = [];
    for (const word of frontier) {
      for (let i = 0; i < word.length; i++) {
        for (let c = 97; c <= 122; c++) {        // 'a' to 'z'
          const next = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
          if (next === end) return depth + 1;
          if (dict.has(next) && !visited.has(next)) {
            visited.add(next);
            nextLevel.push(next);
          }
        }
      }
    }
    frontier.length = 0;
    frontier.push(...nextLevel);
    depth++;
  }
  return 0;
}
```

- **Complexity:** O(N × M × 26) where N = dictionary size, M = word length

### Problem 2: Network Delay Time (Dijkstra frontier)
