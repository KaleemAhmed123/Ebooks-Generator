## Building the trie offline

- We do not update the live Trie in memory every time a user searches for a word. That would require write locks, destroying read performance
- **Offline build:** 
  1. User searches are dumped into a Kafka log
  2. A Spark/Hadoop batch job runs hourly. It counts the frequencies and builds an entirely new Trie from scratch
  3. The batch job serialises the new Trie and saves it to an Object Store
  4. The live API servers download the new snapshot, load it into memory, and atomically swap a pointer from the old Trie to the new Trie
- This provides 100% lock-free reads on the live servers

### The failure

- Attempting to increment frequencies and resort the top-k arrays in the live Trie while it is serving read requests. The contention will ruin latency.

:::interview
A viral news event happens. Millions of people search for a new term. How long does it take for this term to appear in your autocomplete suggestions?

Approximately one hour. The autocomplete Trie is entirely read-only and is rebuilt from scratch by an offline batch job using the last hour of search logs.
:::\n