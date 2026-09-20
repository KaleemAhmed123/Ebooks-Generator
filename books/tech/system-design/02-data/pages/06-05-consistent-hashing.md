## Consistent hashing

- The `hash(key) % N` anti-pattern forces a massive data migration every time you add or remove a node. In 1997, David Karger solved this with **consistent hashing**
- Instead of using a modulo, imagine the hash output space (from `0` to `2^32 - 1`) mapped onto a circle (a ring)

<svg viewBox="0 0 460 140" role="img" aria-label="Consistent hashing ring. Nodes A, B, C are placed on the ring. Keys k1, k2, k3 are placed on the ring. A key belongs to the next node found by moving clockwise." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <circle cx="230" cy="70" r="50" fill="none" stroke="#1d4e89" stroke-width="2"/>
  
  <!-- Nodes -->
  <circle cx="230" cy="20" r="4" fill="#1a1a1a"/>
  <text x="230" y="10" text-anchor="middle" font-weight="bold">Node A</text>
  
  <circle cx="273" cy="95" r="4" fill="#1a1a1a"/>
  <text x="290" y="105" font-weight="bold">Node B</text>
  
  <circle cx="187" cy="95" r="4" fill="#1a1a1a"/>
  <text x="170" y="105" text-anchor="end" font-weight="bold">Node C</text>
  
  <!-- Keys -->
  <circle cx="265" cy="35" r="2" fill="#b8541a"/>
  <text x="275" y="32" font-size="7">k1 (goes to B)</text>
  
  <circle cx="200" cy="110" r="2" fill="#b8541a"/>
  <text x="200" y="125" text-anchor="middle" font-size="7">k2 (goes to A)</text>
  
  <path d="M265 35 A50 50 0 0 1 273 95" fill="none" stroke="#6b6b6b" stroke-dasharray="2 2"/>
  <path d="M273 95 l-2 -5 h4 z" fill="#6b6b6b" transform="rotate(30 273 95)"/>
</svg>

- **How it works**: You hash the IP address of your servers and place them on the ring. You then hash the key of your data and place it on the same ring. To find which server owns the data, move clockwise from the key until you hit a server
- **The magic**: If you add Node D, only the keys that fall between Node D and its counter-clockwise neighbor must move. The rest of the keys stay exactly where they are. Consistent hashing "changes minimally as the range of the function changes"

### The failure

- The default implementation assigns exactly one token (one spot on the ring) to each physical node. This causes two problems
- First, the hash function will not space the nodes perfectly evenly; Node A might own 60% of the ring while Node B owns 10%. Second, if Node B dies, its entire 10% load shifts instantly to Node C (the next node clockwise), creating a localized hotspot that can take Node C down too
