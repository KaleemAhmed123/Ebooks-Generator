# Module 1 - The workload decides the model

## Questions before the model

- Pick the data model from the workload: the set of questions the database will have to answer. Not from what the team already knows, and not from what is popular this year

| The dimension | What it tells you |
|---|---|
| **Access pattern** | Do you read by ID, scan a range, or traverse a graph? |
| **Read/write ratio** | Mostly reads (B-tree, Module 2) or mostly writes (LSM tree)? |
| **Relationships** | Do entities stand alone, or is everything connected? |
| **Dataset size** | Will it fit on one disk, or must it partition? |
| **Schema churn** | Does the structure change every week? |

- DynamoDB's own guidance: "you shouldn't start designing your schema for DynamoDB until you know the questions it will need to answer"

### The failure

- The database is chosen first. Months later the product needs one query the model cannot serve
- A social graph in a key-value store: "friends of my friends" means fetching every friend, then one more query per friend (the N+1 pattern: one query, then N more). The database is not slow. The model is wrong
