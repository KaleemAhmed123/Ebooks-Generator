## Phase 4: Optimise and Prove

You have an idea for the optimal solution. Do not touch the keyboard yet. 
If you start coding before the interviewer agrees with your approach, you risk writing 40 lines of code for an algorithm that handles a fundamentally incorrect assumption. 

### The Pitch

Explain your algorithm end-to-end. Be specific about the data structures.

*"I think we can solve this in O(N log K) time using a Min-Heap. We'll iterate through the array, pushing elements into the heap. If the heap size exceeds K, we pop the minimum. Because the heap always removes the smallest elements, at the end of the array, the heap will contain exactly the K largest elements. The root will be the Kth largest. Space complexity will be O(K) to store the heap."*

### The Check-in

Once you pitch the solution, ask for explicit permission to code.

- *"Does this approach make sense?"*
- *"Are you happy with this O(N) time complexity, or should I look for something faster?"*
- *"Would you like me to start implementing this?"*

### The Pivot

If the interviewer says, "Can we do better on space?", **do not get defensive.** They are handing you a hint.

*"Okay, you're looking for an O(1) space solution. That means I can't use the Hash Map. Let's look at the constraints again... oh, the array is sorted! Because it's sorted, I don't need a map to find duplicates, I can just use two pointers."*

Accept the hint, adjust the constraints, and derive the new approach.
