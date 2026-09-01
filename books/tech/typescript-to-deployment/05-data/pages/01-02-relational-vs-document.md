## Relational and document stores

- Every application has data with relationships. An order belongs to a seller, contains items, and has one shipment
- The two families of database disagree about **where those relationships are enforced**
- A **relational** database stores each entity in its own table and joins them at read time. The shape is declared once, and the database rejects anything that does not fit
- A **document** database stores an entity and the things belonging to it as one nested document, retrieved in a single read
- Relational buys correctness. A foreign key means an order cannot reference a seller that does not exist, and nothing in the application can violate it
- Document buys locality. If you always read an order with its items, storing them together is one read instead of a join
- The cost of relational is that a shape change means a migration, applied to every row
- The cost of document is that nothing enforces the shape, so a typo in a field name creates a new field rather than an error
- Neither is a NoSQL versus SQL argument. MongoDB has transactions and PostgreSQL stores JSON

### The question that actually decides it

- Not "how is the data shaped", but **"what is always read together, and what is queried independently"**
- Data read as a unit belongs in a document. Data queried from many directions belongs in tables
