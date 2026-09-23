## Picking an instance

- Four families, and the choice follows from one question: how much does the cost of a request vary, and does the request need to reach a particular instance

| Family | NGINX | Envoy | Right when |
|---|---|---|---|
| Round robin (weighted) | the default | the default | requests cost roughly the same |
| Least request | `least_conn` | weighted least request | durations vary widely — uploads, reports |
| Random | `random` | `random` | no health information; better than round robin then |
| Hash | `ip_hash`, `hash … consistent` | ring hash, Maglev | a key must land on the same instance |

- Weights are what make round robin usable on mixed hardware, and they have to be set from measured capacity rather than from the instance type's name. Unweighted round robin over a 32-core and a 2-core instance sends both the same number of requests, and the small one falls over first
- Least request is the default worth reaching for, because it needs no configuration to adapt: a slow instance accumulates in-flight requests and receives proportionally less without anyone measuring it. How it picks at scale is page 4
- Hashing is the odd one out — it exists to defeat balance, not to achieve it. The question it answers is locality: the same cache key, the same session, the same shard, on the same instance

### The failure

- Plain modulo hashing, `hash(key) % N`. It distributes evenly and re-maps almost every key the moment `N` changes, so adding one instance to a pool of ten moves roughly nine keys in ten to a different node
- Behind a cache that is a near-total miss storm during a deploy; behind a stateful pool it is every session invalidated at once. Consistent hashing exists precisely to bound that movement to about `1/N` of keys, and it is booklet 02's subject. In a balancer it appears as NGINX's `consistent` flag or Envoy's ring hash and Maglev
