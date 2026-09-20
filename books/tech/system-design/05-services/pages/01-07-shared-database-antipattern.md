## The shared database

- A common anti-pattern in distributed systems is extracting services at the application tier while leaving them coupled at the database tier. Service A and Service B run as independent processes but read and write to the exact same database tables
- This defeats the purpose of microservices. The services are not independent because the database schema acts as a hidden, rigid contract between them

<svg viewBox="0 0 460 140" role="img" aria-label="Three services writing to one shared database. Service A, B, and C all point to a single Database box. Hidden edges couple them together." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="50" y="20" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="90" y="38" text-anchor="middle">Service A</text>
  
  <rect x="190" y="20" width="80" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="230" y="38" text-anchor="middle">Service B</text>
  
  <rect x="330" y="20" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="370" y="38" text-anchor="middle">Service C</text>
  
  <rect x="170" y="90" width="120" height="40" rx="4" fill="#fcfcfc" stroke="#1a1a1a" stroke-width="2"/>
  <text x="230" y="115" text-anchor="middle" font-weight="bold">Shared Database</text>
  
  <path d="M90 50 L180 90" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M180 90 l-5 -6 l3 5 l-6 -2 z" fill="#1d4e89"/>
  <path d="M230 50 L230 90" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M230 90 l-3 -6 h6 z" fill="#b8541a"/>
  <path d="M370 50 L280 90" stroke="#1a1a1a" fill="none" stroke-width="2"/><path d="M280 90 l-1 -6 l-3 5 l6 -1 z" fill="#1a1a1a"/>
</svg>

- When Service A needs to change a column name, it must coordinate with Service B and Service C. This destroys independent deployability
- There is no clear owner for migrations, and hidden write paths emerge where Service B updates a row that Service A thought it owned exclusively

### The failure

- Shared databases couple performance as well as schema. If Service B runs a heavy reporting query or a massive index rebuild, it locks tables and consumes database CPU
- Service A, handling live user traffic, suddenly times out and crashes. Service B's internal workload took down Service A's public API because they share the same physical database resources
