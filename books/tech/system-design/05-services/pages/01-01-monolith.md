# Module 1 - The shape of the system

## The monolith

- A monolith is one deployable unit: one process, one database, one transaction boundary. A call between two parts of it is a function call, nanoseconds and no partial failure, and a write that touches three tables commits or rolls back as one
- It is the default, not the embarrassment. Fowler's observation (2015): almost all the successful microservice stories started with a monolith that got too big and was broken up, and almost all the systems he had heard of that were built as microservices from scratch ended in serious trouble (page 4)

<svg viewBox="0 0 460 128" role="img" aria-label="A monolith. One process box holding three internal parts, orders, billing and inventory, calling each other by function call; one database; one transaction boundary drawn around a write that touches all three tables; a single deploy pipeline feeding the one process. Beside it, the two real failure modes: a deploy queue where fifty engineers wait on one build, and a schema where any module may join any table." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="20" width="230" height="70" rx="4" fill="#fff" stroke="#1d4e89" stroke-width="1.5"/><text x="121" y="34" text-anchor="middle">one process</text>
  <rect x="16" y="42" width="60" height="26" rx="3" fill="#fff" stroke="#333"/><text x="46" y="58" text-anchor="middle" font-size="7.5">orders</text>
  <rect x="91" y="42" width="60" height="26" rx="3" fill="#fff" stroke="#333"/><text x="121" y="58" text-anchor="middle" font-size="7.5">billing</text>
  <rect x="166" y="42" width="60" height="26" rx="3" fill="#fff" stroke="#333"/><text x="196" y="58" text-anchor="middle" font-size="7.5">inventory</text>
  <line x1="76" y1="55" x2="91" y2="55" stroke="#333" marker-end="url(#d)"/><line x1="151" y1="55" x2="166" y2="55" stroke="#333" marker-end="url(#d)"/>
  <text x="121" y="82" text-anchor="middle" font-size="7">calls are function calls: nanoseconds, no partial failure</text>
  <rect x="266" y="28" width="80" height="54" rx="3" fill="#e6f2ff" stroke="#333"/><text x="306" y="44" text-anchor="middle">one database</text><text x="306" y="57" text-anchor="middle" font-size="7">one transaction spans</text><text x="306" y="68" text-anchor="middle" font-size="7">orders, invoices, stock</text>
  <line x1="236" y1="55" x2="266" y2="55" stroke="#333" marker-end="url(#d)"/>
  <rect x="376" y="28" width="78" height="54" rx="3" fill="#fff" stroke="#333"/><text x="415" y="44" text-anchor="middle">one deploy</text><text x="415" y="57" text-anchor="middle" font-size="7">the whole thing ships</text><text x="415" y="68" text-anchor="middle" font-size="7">or none of it does</text>
  <line x1="376" y1="55" x2="346" y2="55" stroke="#333" stroke-dasharray="3 3"/>
  <text x="6" y="108" font-size="7.5" fill="#bf4c28">✕ the real failure is not speed: fifty engineers queue on one build, and any module may join any table because nothing stops it</text>
  <text x="6" y="122" font-size="7">a monolith scales out fine behind a balancer (Module 7); what does not scale is the number of teams changing one deployable</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- One process means one debugger, one stack trace, one log, one deploy that is either fully live or not. Those are properties a distributed system spends this whole booklet buying back
- What a monolith does not give: independent release of one part, independent scaling of one part, and a different data store for one part. Whether those are needed is the question on page 4, and it is answered by the team and the workload, not by taste

### The failure

- Sizing the decision by performance. A monolith behind a load balancer serves large traffic; what breaks is the build and deploy queue when fifty engineers share one pipeline, and the schema where "everyone touches everything" because no compiler forbids a join across a boundary. Page 2 fixes the second without a network; page 3 is what it costs to fix the first
