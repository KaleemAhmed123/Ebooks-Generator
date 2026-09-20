## Ranking stage

- A purely chronological feed is simple, but an algorithmic feed (Facebook, TikTok) drives engagement. Ranking is a *stage* that happens after retrieval
- **1. Candidate Generation:** Fetch the 800 chronological posts from the hybrid merge
- **2. Light Ranker:** A fast, cheap ML model scores all 800 posts based on simple features (time, author affinity)
- **3. Heavy Ranker:** The top 100 posts from the light ranker are sent to a massive neural network (predicting clicks, likes, watch time)
- **4. Filters:** Remove NSFW, inject sponsored ads, drop duplicates

### The failure

- Trying to rank all 800 candidate posts using the Heavy Ranker. Deep neural nets are computationally expensive. Running inference 800 times in the 200ms budget is impossible. You must funnel it through a Light Ranker first

:::interview
You want to implement a neural network to rank the user's feed. You run it on all 800 posts retrieved from the cache. Latency spikes to 3 seconds per request. How do you fix the architecture?

Implement a multi-stage ranking funnel. Use a cheap heuristic (Light Ranker) to whittle the 800 down to 50, and only run the expensive neural net (Heavy Ranker) on those top 50.
:::
