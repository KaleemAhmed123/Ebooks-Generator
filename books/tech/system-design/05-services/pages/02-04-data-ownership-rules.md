## Who may write what

- The single-writer principle governs microservices: for any given piece of data, exactly one service has the authority to mutate it. This service is the source of truth
- When Service A needs to associate its data with Service B's data, it stores an ID, not a full foreign-key relationship or an embedded object

````typescript
// BANNED: Coupling across contexts
type Order = {
  id: string;
  total: number;
  // This implies the Order service knows the full shape of a Customer
  customer: Customer; 
}

// CORRECT: Referencing by ID
type Order = {
  id: string;
  total: number;
  // The Order service only stores the ID. If it needs the email, 
  // it fetches it from the Identity service, or keeps a local copy
  customerId: string; 
}
````

- Because the database is split, you lose referential integrity. The database can no longer enforce that `customerId` actually exists. The application must handle missing records gracefully

### The failure

- The failure is attempting to enforce cross-service foreign keys. If the Order database has a hard foreign key constraint pointing to the Customer database, the databases are coupled
- Even if you enforce it in code (e.g., checking the Customer service before every Order insert), you create a strict temporal coupling. If the Customer service is down, you cannot take an order
