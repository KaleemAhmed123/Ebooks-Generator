## Clarify the requirements

- "Design a URL shortener" is not one system. A shortener for a marketing team needs custom aliases and click analytics; a public one needs abuse control and expiry. The first five minutes decide which one is being built
- **Functional requirements** are what the system does. Pick three, write them on the board, and name what is out: "no analytics, no custom domains, no login". Naming the cuts is graded as highly as naming the features, because it is the part the interviewer cannot see from a drawing
- **Non-functional requirements** are how the system behaves: latency, availability, consistency, scale. Each one is a number, or it is not a requirement yet

| Adjective, ungradeable | Number, gradeable |
| :--- | :--- |
| highly available | 99.99 %: about 4 minutes down per month |
| fast | redirect p99 under 50 ms |
| a lot of traffic | 10 M daily users, 100 reads per write |
| consistent | a paid seat is never sold twice, feed order may lag seconds |

- Two questions change the design more than the rest, so ask them first: the read-to-write ratio (decides whether the read path or the write path is the deep dive) and, in a partition, availability or consistency (booklet 03; decides the store)
- Write the numbers where both people can see them. Every later choice is defended by pointing at one

### The failure

- "It should be scalable." Nothing can be evaluated against an adjective. Without the read-to-write ratio there is no case for a cache; without a p99 there is no case against one. A candidate who lets the adjectives stand has no ground to argue from in minute 30
