## In-process vs distributed caching

- A Distributed Cache (like Redis or Memcached) is a separate cluster of servers over the network. All application instances talk to it. If Instance A writes a key, Instance B can immediately read it
- An In-Process Cache (or Local Cache) is simply a hash map sitting in the RAM of the application process. It is thousands of times faster than Redis because there is no network hop, no JSON parsing, and no TCP socket to negotiate

| Feature | In-Process (Local Map) | Distributed (Redis) |
|---|---|---|
| **Speed** | Nanoseconds | Milliseconds |
| **Consistency** | Low (Instance A and B will disagree) | High (Single source of truth) |
| **Cold Starts** | Every deploy wipes the cache | Survives app deploys |
| **Best For** | Static config, extreme hot-keys | User sessions, rate limits |

### The failure

- The failure is caching massive datasets in-process across many instances. If you have a 2GB product catalog, and 40 application instances, an in-process cache means you are storing 40 identical copies of that 2GB catalog, wasting 80GB of RAM across your fleet
- Furthermore, every one of those 40 instances will have to hit the database to warm up their own copy of the cache. For large datasets, use a distributed cache so the data is only stored and fetched once
