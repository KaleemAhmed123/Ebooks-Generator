## Data model

- One row per seat per event, and its `status` is the invariant. `available`, `held` or `booked`, with `held_by` and `hold_expires` beside it: a seat's state is one row's columns, and the database's own row lock is what serialises two buyers (page 3)

```sql
CREATE TABLE seats (
  event_id      bigint      NOT NULL,
  seat_id       text        NOT NULL,          -- "A-14"
  status        text        NOT NULL DEFAULT 'available'
                CHECK (status IN ('available', 'held', 'booked')),
  held_by       bigint,                        -- user id while held
  hold_expires  timestamptz,                   -- NULL unless held
  booking_id    bigint,                        -- set on booked, never cleared
  PRIMARY KEY (event_id, seat_id)
);

CREATE TABLE bookings (
  id          bigint PRIMARY KEY,
  event_id    bigint NOT NULL,
  user_id     bigint NOT NULL,
  seat_ids    text[] NOT NULL,
  payment_id  text,                            -- Module 11's row
  status      text NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled'))
);
```

- The seat table is the hot one and it is small: 10 000 rows per event, so an event's map is one megabyte and fits any cache (page 6)
- `booking_id` is never cleared, so "who bought A-14" is a lookup, not an archaeology. A cancellation writes `status = 'available'` and a new booking later sets a new id; the history is in `bookings`
- Status is the invariant because the database can enforce it: a transition is `UPDATE … WHERE status = 'available'`, and the `CHECK` refuses any state the design did not name. Module 11, page 5 is the same idea for a payment

### The failure

- A `seats_remaining` counter on the event row. Every buyer decrements one row, so the whole on-sale burst serialises on one lock; nobody can hold a specific seat; a cancellation is an increment that says nothing about which seat came back; and "who has A-14" cannot be answered. One row per seat costs 10 000 rows and buys every one of those answers
