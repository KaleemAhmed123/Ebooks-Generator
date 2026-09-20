## Schema evolution

- In a CRUD system, if you want to rename the `userId` column to `accountId`, you write an `ALTER TABLE` migration script. The database updates the schema, and the old name is gone.
- In Event Sourcing, events are immutable historical facts. You cannot run an `UPDATE` query against an Event Store. If you emitted an `OrderCreated` event three years ago with a `userId` field, that event will exist with that exact JSON structure until the end of time. 

```typescript
// The Reducer must handle EVERY version of an event ever emitted
function reduceOrderCreated(state, event) {
  // Version 1 (2023-2024): We used 'userId'
  if (event.version === 1) {
    state.accountId = event.payload.userId; 
  } 
  // Version 2 (2025-Present): We use 'accountId'
  else if (event.version >= 2) {
    state.accountId = event.payload.accountId;
  }
  
  return state;
}
```

- When you change the schema of an event, you must increment its version number. Your code (specifically, the Reducer function) must be able to parse and handle every historical version of that event that has ever existed in your system.

### The failure

- Renaming a field breaks the system when replaying old events. A developer decides that `userId` is a bad variable name and renames it to `accountId` in their TypeScript interfaces. They deploy the code. New events work fine. But a week later, they need to rebuild a Read Model and trigger a replay of the event log from the beginning of time. The system encounters an event from 2023. The new code tries to read `event.payload.accountId`, gets `undefined`, and crashes. The entire rebuild process halts. In Event Sourcing, your code must remain eternally backward-compatible with your data
