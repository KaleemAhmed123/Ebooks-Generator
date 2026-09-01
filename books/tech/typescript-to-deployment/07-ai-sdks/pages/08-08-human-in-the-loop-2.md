### Making it survive the wait

- A human takes hours. **The run cannot be a variable in a process that will be redeployed**
- Persist the whole conversation with the pending action. On approval, load it, append the tool result, and continue the loop

### The four rules

- **Show the arguments, not the tool name.** "Refund 4,500 rupees on order o_842" is reviewable; `refund_order` is not
- **Record the approver and the time**, because this is now an audit trail
- **Rejection is a tool result too.** Send it back as `is_error` so the agent can adapt instead of hanging
- **Approvals expire.** A pending action from last week should not execute when someone finally clicks it
