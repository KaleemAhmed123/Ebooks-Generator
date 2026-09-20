# Module 1 - The workload decides the model

## Questions before the model

- The worst way to choose a database is to pick one because you already know it, or because it is currently popular, and then try to bend your data to fit its rules
- You must work backward from the workload. The workload is the exact set of questions the database will need to answer

| The dimension | What it tells you |
|---|---|
| **Access pattern** | Do you read by ID, scan a range, or traverse a graph? |
| **Read/write ratio** | Is it 99% reads (B-tree) or 99% writes (LSM tree)? |
| **Relationships** | Do entities stand alone, or is everything connected? |
| **Dataset size** | Will it fit on one disk, or must it partition? |
| **Schema churn** | Does the structure change every week? |

- DynamoDB's own documentation states this explicitly: "you shouldn't start designing your schema until you know the questions it will need to answer"

### The failure

- Choosing the database first, building the system, and then discovering the product requires a query the database fundamentally cannot do efficiently
- If you store a social graph in a key-value store, asking "who are the friends of my friends?" requires fetching every friend, then firing a new query for each of their friends (an N+1 query storm). The database is not slow; the model is wrong
