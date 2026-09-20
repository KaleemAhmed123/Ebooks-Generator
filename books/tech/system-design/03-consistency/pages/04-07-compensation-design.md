## Designing compensations

- A compensation is not a `ROLLBACK`. A rollback reverts the bits on the disk to their exact previous state. A compensation is **semantic undo**. It is a brand new transaction that logically reverses the business impact of the previous transaction
- Every compensation must be **idempotent**. If the saga runner crashes while executing the compensation, it will wake up and run the compensation a second time

| Step | Compensation | Pivot? |
|---|---|---|
| Reserve $100 | Release $100 hold | No |
| Create `Invoice` record | Update `Invoice` status to `CANCELLED` | No |
| Charge credit card | Issue a $100 refund via Stripe API | No |
| **Ship the item on a truck** | **Cannot be compensated in software!** | **Yes** |

- **Pivot steps**: A pivot is a step that has no software compensation. Once the delivery truck leaves the warehouse, or you print a physical concert ticket, or you send an email saying "Your account is deleted", you cannot undo it
- The Golden Rule of saga design: **Never place a pivot before a step that might fail**. All operations that might fail (e.g., checking if the item is in stock, or charging the card) must execute *before* the pivot step

### The failure

- Treating a database `DELETE` as a compensation for an `INSERT`. If Step 1 inserts an order, your compensation should not delete the row. It should update the status to `CANCELLED`. If you delete the row, you destroy the audit trail, and customer support will have no idea why the user's order disappeared
