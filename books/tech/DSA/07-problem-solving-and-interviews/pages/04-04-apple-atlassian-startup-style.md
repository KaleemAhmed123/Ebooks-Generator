## Apple, Atlassian, and Startup Style

Companies outside the standard FAANG mold often run "Practical" algorithmic rounds. They care less about dynamic programming and more about whether you can build a feature today.

### The Reasoning Type

These companies test **Domain Execution**. They often frame their algorithmic questions around their actual product domain.

- **Heavy on Parsing and State Machines:** "Parse this simplified JSON string", or "Evaluate this mathematical expression."
- **Heavy on API Design:** They will ask you to design a class that implements `subscribe()`, `publish()`, and `throttle()`.
- **Heavy on Rate Limiting and Concurrency:** Especially for backend roles, expect algorithms dealing with Token Buckets or Leaky Buckets.

### How to Succeed

- **Code readability is paramount.** These companies are evaluating if they want to approve your Pull Requests tomorrow. Use excellent variable names.
- **Understand trade-offs.** They will ask "Why did you use a Hash Map instead of an Array?" You need to articulate the trade-off between memory overhead and O(1) lookups.
- **Don't over-engineer.** If a simple O(N) scan solves the problem cleanly, don't try to write a complex Segment Tree just to show off. They want pragmatic engineers, not academics.
