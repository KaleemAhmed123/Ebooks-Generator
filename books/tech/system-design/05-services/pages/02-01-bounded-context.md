# Module 2 - Boundaries and data ownership

## Bounded context

- A **bounded context** is the boundary inside which one model and one vocabulary hold: one meaning per word, one owner per meaning. Outside it the same word may mean something else, and that is correct, not a defect to reconcile
- "Customer" in billing is a payment method, a tax id and a credit limit; in support it is a ticket history and an email; in shipping it is an address and a delivery window. Three models, three owners, one word. A service boundary is a bounded context that got a process

<svg viewBox="0 0 460 120" role="img" aria-label="Two bounded contexts side by side, billing and support, each with its own Customer type. Billing's has id, payment method, tax id and credit limit. Support's has id, email, ticket history and satisfaction score. The only thing they share is the id. Between them, marked with an orange cross, one canonical Customer type with all the fields of both plus everything anyone ever asked for: two hundred fields, owned by nobody, imported by every service, so any field added for one breaks the deserialiser of another." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="10" width="140" height="80" rx="4" fill="#fff" stroke="#1d4e89"/><text x="76" y="24" text-anchor="middle">billing context</text>
  <g font-size="7"><text x="16" y="40">Customer {</text><text x="24" y="50">id, paymentMethod,</text><text x="24" y="60">taxId, creditLimit</text><text x="16" y="70">}</text><text x="16" y="84" fill="#1d4e89">owner: billing team</text></g>
  <rect x="314" y="10" width="140" height="80" rx="4" fill="#fff" stroke="#1d4e89"/><text x="384" y="24" text-anchor="middle">support context</text>
  <g font-size="7"><text x="324" y="40">Customer {</text><text x="332" y="50">id, email, tickets[],</text><text x="332" y="60">satisfaction</text><text x="324" y="70">}</text><text x="324" y="84" fill="#1d4e89">owner: support team</text></g>
  <line x1="146" y1="50" x2="314" y2="50" stroke="#333" stroke-dasharray="3 3"/><text x="230" y="45" text-anchor="middle" font-size="7">shared: the id, nothing else (page 4)</text>
  <rect x="170" y="60" width="120" height="30" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="230" y="72" text-anchor="middle" font-size="7" fill="#bf4c28">✕ one canonical Customer,</text><text x="230" y="83" text-anchor="middle" font-size="7" fill="#bf4c28">200 fields, imported by everyone</text>
  <text x="6" y="110" font-size="7">a field added for support changes a type billing deserialises; the god object couples every service through the one thing they all import</text>
</svg>

- What crosses the boundary is an id and the few fields the other side needs, translated at the edge into the receiving context's own model (page 4). Billing never learns what a ticket is; support never learns what a credit limit is; a change to either model stays inside its owner's deploy
- The vocabulary is the test: if two teams argue about what a word means, they are in two contexts, and the argument ends by giving each its own type. Finding those seams is page 2

### The failure

- The one canonical "Customer" every service imports. It grows to two hundred fields, every team adds to it, nobody owns it, and a field added for support changes a payload billing must parse. It is the shared database (Module 1, page 7) expressed as a type: coupling through a definition instead of a table
