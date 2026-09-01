# Module 5 - MongoDB

## MongoDB

- Relational databases require the shape to be declared before the first row exists, and changed with a migration afterwards
- That is the right trade when the shape is known. It is friction when it genuinely is not, or when every record differs
- **MongoDB** stores **documents** instead of rows. A document is JSON-like, nested, and no two in a collection need the same fields
- A **collection** is the rough equivalent of a table, except it enforces nothing about what goes in it
- Because a document holds its children, reading an order with its items is one read rather than a join
- That locality is the real argument for it, not the lack of a schema
- Documents are stored as **BSON**, a binary form of JSON that adds types JSON lacks, including dates, 64-bit integers and `ObjectId`
- An **ObjectId** is a 12-byte id containing a timestamp, so it sorts roughly by creation time for free
- The cost is that nothing stops a typo creating a new field, and nothing enforces that an order points at a seller that exists
- Those guarantees move into your application, which is what Mongoose exists to provide
- Created by 10gen in 2009, now MongoDB Inc. Version 9.0 is current

### What version 9 changed

- `autoEmbed`, which generates vector embeddings inside the database rather than in a separate pipeline
- Near-instant automated resharding, so data redistributes across new servers without downtime
- Roughly 54 percent faster bulk writes
