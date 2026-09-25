## Two Pointers Variations <span class="lv lv1"></span>

- The standard two pointer techniques (Collision and Read/Write) are the foundation. Interviewers often twist them by applying them to different data structures or adding a second dimension

### The Fast/Slow (Hare & Tortoise) Pointer

- Used primarily on **Linked Lists** to detect cycles or find the midpoint
- **Mechanism:** `slow` moves 1 step, `fast` moves 2 steps
- **Why it works (Cycle):** If there is a cycle, the fast pointer will eventually "lap" the slow pointer and they will point to the same node. If there is no cycle, `fast` reaches `null`
- **Why it works (Midpoint):** When `fast` reaches the end of the list, `slow` is exactly halfway through, because it traveled at half the speed

```ts
function hasCycle(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;
  
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
    
    if (slow === fast) return true; // collision
  }
  return false;
}
```
