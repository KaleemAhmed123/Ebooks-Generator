## Operational transformation

- **Operational Transformation (OT):** The algorithm that powers Google Docs.
- Instead of sending "The document is now 'Cat'", the client sends an Operation: `Insert 's' at index 3` (Cats)
- If Alice inserts 's' at index 3, and Bob concurrently inserts 'y' at index 0 (producing 'yCat'), Bob's action shifts all the indexes by 1
- The server receives both Operations. It **Transforms** Alice's operation against Bob's. It changes Alice's operation to `Insert 's' at index 4`
- **The requirement:** OT *requires* a central server to act as the single sequencer of truth. It does not work peer-to-peer

<svg viewBox="0 0 460 110" role="img" aria-label="Operational Transformation (OT) requires a central server to sequence and transform concurrent edits" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="10" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="25" text-anchor="middle" font-weight="bold">Alice</text>
  <text x="60" y="35" text-anchor="middle" font-size="6">Insert 's' at 3</text>
  
  <rect x="20" y="70" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="85" text-anchor="middle" font-weight="bold">Bob</text>
  <text x="60" y="95" text-anchor="middle" font-size="6">Insert 'y' at 0</text>
  
  <rect x="180" y="30" width="100" height="50" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="50" text-anchor="middle" font-weight="bold" fill="#1d4e89">Central Server</text>
  <text x="230" y="60" text-anchor="middle" font-size="6" fill="#1d4e89">Transforms Alice's index</text>
  <text x="230" y="70" text-anchor="middle" font-size="6" fill="#1d4e89">from 3 -> 4</text>
  
  <rect x="340" y="40" width="80" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="380" y="55" text-anchor="middle" font-weight="bold" fill="#b8541a">Doc State</text>
  <text x="380" y="65" text-anchor="middle" font-size="6" fill="#b8541a">"yCats"</text>
  
  <path d="M100 25 L180 45" stroke="#1a1a1a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M100 85 L180 65" stroke="#1a1a1a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M280 55 L340 55" stroke="#1d4e89" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
</svg>

### The failure

- Trying to build OT as a peer-to-peer network without a central server. The number of mathematical edge cases required to transform operations without a single authoritative timeline explodes into impossible complexity.

:::interview
You are building a Google Docs clone using Operational Transformation (OT). Can two users on a train edit a document together via Bluetooth without internet?

No. OT fundamentally requires a central authoritative server to receive concurrent operations, sequence them into a single timeline, transform them, and broadcast the corrected indexes back to the clients.
:::\n