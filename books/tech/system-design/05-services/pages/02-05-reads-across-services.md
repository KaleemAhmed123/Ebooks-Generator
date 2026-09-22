## Reading data you do not own

- A screen that needs data from three services has two ways to get it: **API composition**, call the three and stitch the result in the caller; or a **read model**, a local table built from the three services' events and shaped for exactly this screen. The first is simple and slow and cannot filter across services; the second is fast and can, and is stale by the event lag

<svg viewBox="0 0 460 156" role="img" aria-label="Two ways to render an orders page that needs order, customer name and product title. Left, API composition: the page's backend calls orders for the list, then identity and catalog for the names and titles, three round trips in the best case; with a batch endpoint, GET users by ids, it stays three; without one it is one call per row, 50 orders becoming 101 calls, marked with an orange cross. Right, a read model: an orders-page table with the fields the screen needs, order id, customer name, product title, total, kept up to date by consuming OrderPlaced, UserUpdated and ProductRenamed events through a broker, booklet 04 owns the mechanism. The page reads one local table in one query and can filter on any column, such as all orders by customers in Canada, which composition cannot do at all." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="6" y="12" font-size="7.5" fill="#1d4e89">API composition: call the owners, stitch in memory</text>
  <rect x="6" y="20" width="92" height="30" rx="3" fill="#fff" stroke="#1d4e89"/><text x="52" y="33" text-anchor="middle">orders page</text><text x="52" y="44" text-anchor="middle" font-size="7">its BFF (Module 3)</text>
  <rect x="120" y="14" width="80" height="18" rx="3" fill="#fff" stroke="#333"/><text x="160" y="26" text-anchor="middle" font-size="7.5">orders API</text>
  <rect x="120" y="38" width="80" height="18" rx="3" fill="#fff" stroke="#333"/><text x="160" y="50" text-anchor="middle" font-size="7.5">identity API</text>
  <rect x="120" y="62" width="80" height="18" rx="3" fill="#fff" stroke="#333"/><text x="160" y="74" text-anchor="middle" font-size="7.5">catalog API</text>
  <line x1="98" y1="28" x2="120" y2="23" stroke="#333" marker-end="url(#d)"/><line x1="98" y1="36" x2="120" y2="47" stroke="#333" marker-end="url(#d)"/><line x1="98" y1="44" x2="120" y2="71" stroke="#333" marker-end="url(#d)"/>
  <text x="6" y="66" font-size="7">1. list 50 orders</text><text x="6" y="76" font-size="7">2. GET /users?ids=…</text><text x="6" y="86" font-size="7">3. GET /products?ids=…</text>
  <text x="6" y="102" font-size="7">three round trips; p99 = the slowest of three (Module 3, page 4)</text>
  <text x="6" y="118" font-size="7.5" fill="#bf4c28">✕ no batch endpoint: one call per row, 50 orders = 101 calls</text>
  <text x="6" y="130" font-size="7.5" fill="#bf4c28">✕ "orders by customers in Canada": cannot filter across services at all</text>
  <text x="240" y="12" font-size="7.5" fill="#1d4e89">read model: a local table shaped for the screen</text>
  <rect x="240" y="20" width="214" height="44" rx="3" fill="#e6f2ff" stroke="#333"/><text x="347" y="33" text-anchor="middle">orders_page (owned by the page's service)</text><text x="347" y="45" text-anchor="middle" font-size="7">order_id · customer_name · country · product_title · total</text><text x="347" y="56" text-anchor="middle" font-size="7">one query, any filter, no call at read time</text>
  <rect x="240" y="84" width="214" height="22" rx="3" fill="#fff" stroke="#1d4e89"/><text x="347" y="98" text-anchor="middle" font-size="7">broker: OrderPlaced · UserUpdated · ProductRenamed (booklet 04)</text>
  <line x1="347" y1="84" x2="347" y2="64" stroke="#1d4e89" marker-end="url(#b)"/><text x="352" y="77" font-size="7" fill="#1d4e89">projector applies events</text>
  <text x="240" y="122" font-size="7">stale by the event lag, seconds typically; the trade is freshness for a join</text>
  <text x="240" y="134" font-size="7">CQRS and projections are booklet 04's; here it is the read-side answer</text>
  <text x="6" y="150" font-size="7">composition for a detail page with three ids; a read model for a list, a search, or a filter that spans owners</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
  </defs>
</svg>

- Composition fits a detail page: three ids, three calls in parallel, the slowest sets the latency. It fails on a list with a filter that spans owners, "orders by customers in Canada", because neither service can answer it and fetching everything to join in memory is the failure below at scale
- A read model is a copy, so it carries the rules of page 6: fed by events, never written by the screen, rebuilt from the sources when it drifts. Booklet 04 owns the projection mechanism and CQRS; this page is where the read-side question is decided

### The failure

- N+1 over the network. A list of 50 orders, then one `GET /users/{id}` per row for the customer's name: 51 sequential calls, each a round trip, and identity is hit 50 times for one page view. The minimum fix is a batch endpoint, `GET /users?ids=…`, which is a contract identity must offer (Module 5); the real fix for a list page is the read model
