## UUIDv4 vs UUIDv7

- A Universally Unique Identifier (UUID) is a 128-bit number, usually printed as a 36-character string (`123e4567-e89b-12d3-a456-426614174000`). It is so large that you can generate them randomly without fear of a collision
- **UUIDv4** is completely random. If you use it as a Primary Key in a relational database, it scatters your inserts. Because the IDs are not sequential, the database has to constantly split B-tree index pages, destroying write performance
- **UUIDv7** (standardized in RFC 9562, May 2024) fixes this. It is time-ordered

<svg viewBox="0 0 460 140" role="img" aria-label="UUIDv7 bit layout. 48 bits timestamp, 4 bits version, 76 bits random." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="55" width="180" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="110" y="73" text-anchor="middle">Unix Milliseconds (48 bits)</text>
  
  <rect x="210" y="55" width="40" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="230" y="73" text-anchor="middle">v7 (4)</text>
  
  <rect x="260" y="55" width="180" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="350" y="73" text-anchor="middle">Random (76 bits)</text>
</svg>

````typescript
// Available natively in Node.js 24.16+ and 26.1+
import { randomUUIDv7 } from 'node:crypto';
const id = randomUUIDv7(); 

// Available natively in Postgres 18+
// INSERT INTO users (id) VALUES (uuidv7());
````

### The failure

- The failure is using UUIDv4 as a clustered primary key in MySQL or Postgres. Because the inserts are completely random, the database cannot simply append new rows to the end of the disk file
- The database has to constantly rewrite index pages in the middle of the file. This is called "Page Splitting" and it causes massive disk I/O spikes under heavy write load. Always use a time-ordered ID (like UUIDv7) for database primary keys
