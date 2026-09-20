## Graceful degradation

- When a dependency fails, throwing a 500 error to the user is the worst option. Graceful degradation means deciding, per feature, what a "worse but up" experience looks like
- The core capability of the product must survive, even if the personalized or heavy features fall away

| Feature | Dependency | Graceful Degradation Strategy |
|---|---|---|
| **E-commerce home page** | Recommendation Engine | Serve the static "Top Sellers" list instead |
| **Search results** | Spelling Auto-correct | Return exact-match results only; hide the "Did you mean?" UI |
| **News feed** | Like/Comment count service | Hide the counts entirely. The feed still scrolls and reads |
| **Video player** | Subtitle translator | Hide the translate button; play the video in the original language |

- This requires the frontend or BFF to be aware of the degradation. The backend must return a 200 OK with the fallback data, and a flag indicating that the response is degraded

### The failure

- The failure is tight coupling. A team builds a beautiful, personalized home page that fetches the user's history, calculates their preferences, and recommends items
- When the Recommendation service goes down, the entire home page returns a 500. The user cannot even navigate to the search bar. The failure of a non-critical side feature took down the core product
