## Dynamic pricing

- Because demand is so high, Ticketmaster uses Dynamic Pricing. The price can change from $100 to $500 in seconds based on queue length.
- This introduces a consistency requirement. When the user clicks "Buy for $100", they must be charged exactly $100, even if the algorithm updated the price in the milliseconds while the request was in flight.

```typescript
// Atomically reserve the seat AND lock in the price
async function reserveAndLockPrice(seatId: string, userId: string, expectedPrice: number) {
  // We use Postgres RETURNING to fetch the actual price AT THE EXACT MOMENT of reservation
  const result = await db.query(`
    UPDATE seats 
    SET owner = $1, status = 'RESERVED' 
    WHERE id = $2 AND status = 'AVAILABLE'
    RETURNING current_price;
  `, [userId, seatId]);

  if (result.rows.length === 0) throw new Error("Seat taken.");

  const actualPrice = result.rows[0].current_price;
  
  if (actualPrice !== expectedPrice) {
    // The price changed! Rollback the reservation.
    await db.query(`UPDATE seats SET owner = NULL, status = 'AVAILABLE' WHERE id = $1`, [seatId]);
    throw new Error(`Price changed to ${actualPrice}. Please confirm.`);
  }

  // Safe to proceed to Stripe with expectedPrice
}
```

- The reservation and the price check must happen in the exact same database transaction. By using the `RETURNING` clause, Postgres guarantees the price we read is the price that was committed.

### The failure

- Client-side price calculation. Never trust a price from the frontend. If your API accepts `price: 10`, a user can intercept the request, change it to $1, and buy a front-row seat. The backend must query the single source of truth.
