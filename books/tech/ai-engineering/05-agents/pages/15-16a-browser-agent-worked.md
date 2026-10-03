## Browser agent: a worked session

- Trace a browser agent (15-15) booking a restaurant, showing where reliability techniques (14-110) actually fire. Hybrid perception (16... set-of-marks, 14-110).

:::mint
```text
Goal: book a table for 2 at 7pm Friday on the restaurant site.

step 1  screenshot → set-of-marks labels elements [1..12]
        decide: click [4] "Reservations"
        verify: new screenshot shows a booking form ✓
step 2  form has [party size] [date] [time] fields
        act: select party=2, date=Fri, time=7:00pm
        verify: fields show the values ✓
step 3  click [9] "Find a table"
        wait: spinner present → wait for load (2s) → results appear
        verify: time slots shown ✓
step 4  no 7:00pm slot — 6:45 and 7:30 available (unexpected state!)
        recover: goal said 7pm; 7:30 is closest → but this is
        consequential → ESCALATE to human: "7pm full; book 7:30?"
```
:::

- **The techniques that fire:** **set-of-marks** picks labeled element `[4]`, not raw pixels (no grounding error); **verify each action** checks the next screenshot before continuing (catches a misclick early); **wait for load** handles the spinner; **recover from surprise** — the "no 7pm slot" does not derail it, and because booking is irreversible (15-14) it **escalates to a human**.
- **The lesson:** steps 1–3 (the happy path) are easy; the reliability engineering is step 4 — verify, wait, handle the surprise. A demo shows 1–3; a product survives 4. The irreversible action is always human-gated.

:::interview
"What separates a browser-agent demo from a production one?"

Handling the unhappy path and gating irreversible actions. A demo shows the happy sequence; a product adds set-of-marks (labeled elements, not guessed pixels), verification after each action (catch a misclick before it compounds), waiting for async loads, and recovery from surprises by reasoning about the goal. Critically, consequential irreversible actions like completing a booking are escalated to a human, never taken on an assumption. Most of the engineering is in the surprises, not the happy path.
:::
