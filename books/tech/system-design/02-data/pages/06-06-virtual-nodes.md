## Virtual nodes

- To fix the uneven distribution of a standard consistent hashing ring, databases like Cassandra and Dynamo introduced **virtual nodes** (vnodes)
- Instead of hashing the node's IP address once, the system assigns multiple tokens to every physical machine. A single node now occupies many random spots on the ring

<svg viewBox="0 0 460 140" role="img" aria-label="Virtual nodes. Node A is green, Node B is orange. Node A owns three non-adjacent slices of the ring. Node B owns the others. Load is perfectly balanced." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <circle cx="230" cy="70" r="50" fill="none" stroke="#6b6b6b" stroke-width="1"/>
  
  <!-- Node A vnodes -->
  <path d="M230 20 A50 50 0 0 1 278 55" fill="none" stroke="#1d4e89" stroke-width="4"/>
  <text x="270" y="30" font-weight="bold" fill="#1d4e89" font-size="7">A</text>
  
  <path d="M265 105 A50 50 0 0 1 205 113" fill="none" stroke="#1d4e89" stroke-width="4"/>
  <text x="240" y="125" font-weight="bold" fill="#1d4e89" font-size="7">A</text>
  
  <path d="M182 55 A50 50 0 0 1 205 27" fill="none" stroke="#1d4e89" stroke-width="4"/>
  <text x="180" y="40" font-weight="bold" fill="#1d4e89" font-size="7">A</text>
  
  <!-- Node B vnodes -->
  <path d="M278 55 A50 50 0 0 1 265 105" fill="none" stroke="#b8541a" stroke-width="4"/>
  <text x="290" y="85" font-weight="bold" fill="#b8541a" font-size="7">B</text>
  
  <path d="M205 113 A50 50 0 0 1 182 55" fill="none" stroke="#b8541a" stroke-width="4"/>
  <text x="175" y="95" font-weight="bold" fill="#b8541a" font-size="7">B</text>
  
  <path d="M205 27 A50 50 0 0 1 230 20" fill="none" stroke="#b8541a" stroke-width="4"/>
  <text x="220" y="15" font-weight="bold" fill="#b8541a" font-size="7">B</text>
  
</svg>

- **The balance**: With 256 vnodes per machine, the statistical distribution of the hash space becomes extremely uniform. If you buy a server with twice the RAM, you simply assign it twice as many vnodes
- **The failover**: If Node A dies, its 256 slices of the ring are handed over to the next clockwise nodes. But because Node A's slices are randomly scattered, the next clockwise nodes will be *every other machine in the cluster*. The load of the dead node is spread evenly across the surviving fleet

### The failure

- Treating vnode allocation as purely random. If you randomly generate 256 tokens, you risk a physical collision: three consecutive tokens on the ring might all belong to Node A
- If your replication factor is 3, the database replicates data to the next 3 clockwise tokens. If all 3 belong to Node A, the data has no physical redundancy. Dynamo fixes this by actively skipping tokens during replication until it finds 3 distinct physical servers
