# Module 13 - Search autocomplete

## Requirements and numbers

- Autocomplete returns the five most likely completions of what the user has typed so far, on every keystroke, fast enough to feel like part of typing. The shape: reads outnumber writes by orders of magnitude, every answer is the same for every user, and nobody needs the answer to include the last minute
- Functional, in: top 5 suggestions for a prefix, ranked by how often the full query was searched; a fresh ranking every hour. Out: the search results themselves, spelling correction, per-user history (page 5)
- Non-functional: under 100 ms end to end, of which the network takes most, so the server has ≈ 10 ms; a walk down a trie in memory is microseconds. The ranking may lag reality by an hour
- Inputs, as assumptions: 100 M searches a day; an average query of 20 characters, of which 10 keystrokes survive the client's debounce (page 5); 20 M distinct queries kept after dropping the ones searched fewer than a few times

| Quantity | Arithmetic | Result |
| :--- | :--- | :--- |
| suggest requests | 100 M searches × 10 prefixes ÷ 86 400 s | ≈ 11 600/s average, ≈ 60 000/s at a 5× peak: every one answered from memory, none from a search index (page 2) |
| updates | one rebuild an hour | between builds the index is read-only; the "write path" is a batch job and a pointer swap (page 3) |
| data | 20 M queries × 25 bytes | ≈ 500 MB of strings; the trie with a top-5 list on every node is several times that, split by prefix across a few shards (page 4) |

- The numbers say the whole design: precompute everything offline, serve a read-only structure from memory, and let the client hold back keystrokes. The interviewer wants the trie (page 2), the offline build with an atomic swap (page 3), and the honest answer about freshness

### The failure

- Searching the index per keystroke. `SELECT query FROM searches WHERE query LIKE 'app%' ORDER BY count DESC LIMIT 5` sorts every query beginning with "app" at 60 000 requests a second. The answer for "app" is the same for everyone and changes once an hour; computing it 60 000 times a second is the design being wrong, not slow
