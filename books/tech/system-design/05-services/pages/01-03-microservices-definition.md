## What "microservice" actually means

- A **microservice** is a process that can be deployed on its own, owns its data, and talks to the others over a network. Three properties, and the first is the one that defines it: if two services must ship together, they are one service with a network inside it
- "Micro" is about the scope one team can own and release, not lines of code. The network hop is the price of independent deploys; page 5 prices it

<svg viewBox="0 0 460 132" role="img" aria-label="Deploy-alone versus deploy-together. Left: three services, orders, billing and inventory, each with its own pipeline and its own database, releasing on their own days, Tuesday, Thursday, Monday; calls between them cross the network. Right, marked with an orange cross, the distributed monolith: the same three boxes, but one release train, one shared schema, and a feature that needs all three to change ships when the last of them is ready; the network cost is paid and the independence is not received." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="6" y="12" font-size="7.5" fill="#1d4e89">deploy alone: each service has its own pipeline, data and release day</text>
  <g font-size="7">
    <rect x="6" y="20" width="62" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="37" y="33" text-anchor="middle" font-size="8.5">orders</text><text x="37" y="46" text-anchor="middle">ships Tuesday</text>
    <rect x="82" y="20" width="62" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="113" y="33" text-anchor="middle" font-size="8.5">billing</text><text x="113" y="46" text-anchor="middle">ships Thursday</text>
    <rect x="158" y="20" width="62" height="34" rx="3" fill="#fff" stroke="#1d4e89"/><text x="189" y="33" text-anchor="middle" font-size="8.5">inventory</text><text x="189" y="46" text-anchor="middle">ships Monday</text>
    <rect x="6" y="64" width="62" height="18" rx="3" fill="#e6f2ff" stroke="#333"/><text x="37" y="76" text-anchor="middle">own DB</text>
    <rect x="82" y="64" width="62" height="18" rx="3" fill="#e6f2ff" stroke="#333"/><text x="113" y="76" text-anchor="middle">own DB</text>
    <rect x="158" y="64" width="62" height="18" rx="3" fill="#e6f2ff" stroke="#333"/><text x="189" y="76" text-anchor="middle">own DB</text>
  </g>
  <line x1="37" y1="54" x2="37" y2="64" stroke="#333"/><line x1="113" y1="54" x2="113" y2="64" stroke="#333"/><line x1="189" y1="54" x2="189" y2="64" stroke="#333"/>
  <line x1="68" y1="37" x2="82" y2="37" stroke="#333" marker-end="url(#d)"/><line x1="144" y1="37" x2="158" y2="37" stroke="#333" marker-end="url(#d)"/>
  <text x="113" y="96" text-anchor="middle" font-size="7">calls cross the network (page 5); a change to one ships without the others</text>
  <text x="250" y="12" font-size="7.5" fill="#bf4c28">✕ the distributed monolith</text>
  <g font-size="7">
    <rect x="250" y="20" width="62" height="34" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="281" y="33" text-anchor="middle" font-size="8.5">orders</text>
    <rect x="326" y="20" width="62" height="34" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="357" y="33" text-anchor="middle" font-size="8.5">billing</text>
    <rect x="392" y="20" width="62" height="34" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="423" y="33" text-anchor="middle" font-size="8.5">inventory</text>
    <rect x="250" y="70" width="204" height="18" rx="3" fill="#e6f2ff" stroke="#bf4c28"/><text x="352" y="82" text-anchor="middle">one shared schema (page 7)</text>
  </g>
  <line x1="281" y1="54" x2="281" y2="70" stroke="#bf4c28"/><line x1="357" y1="54" x2="357" y2="70" stroke="#bf4c28"/><line x1="423" y1="54" x2="423" y2="70" stroke="#bf4c28"/>
  <text x="352" y="100" text-anchor="middle" font-size="7" fill="#bf4c28">one release train: all three, when the last is ready</text>
  <text x="352" y="110" text-anchor="middle" font-size="7" fill="#bf4c28">the network is paid for; the independence never arrives</text>
  <text x="6" y="126" font-size="7">the test is a question: can this service ship a change today without asking anyone? if not, the boundary is a wish</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- Data ownership is the second property: the service is the only writer of its tables, and everyone else reads through its API or its events (Module 2). A second writer couples the two at the storage layer, and a schema change then needs a joint deploy, which is the first property lost
- A team owning a service end to end, code, data, pager, is the third property in practice: it is what independent deploys are for (page 6)

### The failure

- The distributed monolith. The system is split into network-connected pieces, but the data or the release cycle is not: one feature touches four repositories, they ship together or break, and every call now pays latency and partial failure (page 5) for an independence nobody receives. It is the worst of both, and it is the most common outcome of splitting early (page 4)
