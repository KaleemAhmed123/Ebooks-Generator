## The relational model

- **One fact in one place**. The relational model (SQL) normalizes data: a user's address lives in the `addresses` table, not duplicated on every order. If the address changes, you update one row
- When you read an order, the database `JOIN`s the tables together to reassemble the complete picture

<svg viewBox="0 0 460 120" role="img" aria-label="Relational tables. Orders table joins to Users table (1:N). Orders table joins to Products table via Order_Lines mapping table (M:N)." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="50" y="20" width="100" height="80" rx="3" fill="#fcfcfc" stroke="#1d4e89"/>
  <rect x="50" y="20" width="100" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="100" y="34" text-anchor="middle" font-weight="bold" fill="#1d4e89">Users</text>
  <text x="60" y="55">1. Alice</text>
  <text x="60" y="70">2. Bob</text>
  
  <rect x="180" y="20" width="100" height="80" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <rect x="180" y="20" width="100" height="20" rx="3" fill="#f0f0f0" stroke="#1a1a1a"/>
  <text x="230" y="34" text-anchor="middle" font-weight="bold">Orders</text>
  <text x="190" y="55">10. (User 1)</text>
  <text x="190" y="70">11. (User 2)</text>
  
  <rect x="310" y="20" width="100" height="80" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <rect x="310" y="20" width="100" height="20" rx="3" fill="#f0f0f0" stroke="#1a1a1a"/>
  <text x="360" y="34" text-anchor="middle" font-weight="bold">Products</text>
  <text x="320" y="55">99. Book</text>
  
  <path d="M150 51 L180 51" stroke="#1d4e89" stroke-dasharray="2 2" fill="none"/>
  <path d="M150 66 L180 66" stroke="#1d4e89" stroke-dasharray="2 2" fill="none"/>
  
  <path d="M280 51 L310 51" stroke="#1a1a1a" fill="none"/><path d="M305 48 L310 51 L305 54" stroke="#1a1a1a" fill="none"/>
  <text x="295" y="47" text-anchor="middle" font-size="7">M:N</text>
</svg>

- Many-to-many relationships cost one mapping table. The query is declarative: you say what you want, the planner picks the access path. Transactions are native
- Fits: ledgers, inventory, anything where relationships are dense and the schema is known

### The failure

- Join fan-out. One profile page needs an eight-table join; at millions of rows the CPU goes to reassembling, not serving. The other shape is N+1: one query for the list, one more per row
- Normalization protects writes and charges reads. A read-heavy workload pays that charge on every request; page 8 is the answer
