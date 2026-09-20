## Reconciliation

- Distributed systems fail. Webhooks get dropped. Database transactions rollback. How do you know your database matches the bank?
- **The nightly batch:** Every night, the PSP provides a Settlement File (a CSV of every transaction they processed)
- You run a massive batch job (Hadoop/Spark) that joins your Ledger against the Settlement File
- **Discrepancies:**
  - In Ledger, not in PSP: We fulfilled an order but didn't get paid
  - In PSP, not in Ledger: We took the user's money but didn't fulfil the order (severe customer support issue)
- Discrepancies are pushed to a queue for manual human review

### The failure

- Assuming your architecture is perfectly exactly-once, and therefore skipping reconciliation. No system is perfect. Reconciliation is the ultimate source of truth

:::interview
Your architecture uses idempotency keys, transactions, and exact exactly-once Kafka streams. Why do you still need a nightly reconciliation batch job?

Because you do not control the PSP's servers. They might have a bug, a dropped webhook, or a catastrophic outage. Reconciliation is the only way to audit external boundaries.
:::\n