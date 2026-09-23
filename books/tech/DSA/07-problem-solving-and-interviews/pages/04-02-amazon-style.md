## The Amazon Style

Amazon interviews blend algorithms with intense system awareness and Leadership Principles (LPs). 

### The Reasoning Type

Amazon tests **Practical Scalability**. While Google asks "Can you do it in O(N)?", Amazon asks "What happens if this array is 500GB?"

- **Heavy on Data Structures:** Expect to implement custom data structures, like LRU Caches, LFUs, or specialized Trie structures.
- **Heavy on Object-Oriented Design:** You will often be asked to design classes and interfaces for your algorithmic solution (e.g., `class ParkingGarage`).
- **Heavy on Greedy and Sorting:** They favor problems that mirror real-world logistics: scheduling intervals, minimizing delivery routes, or sorting massive logs.

### How to Succeed

- **The LP is half the grade.** You can write flawless O(N) code, but if you fail the behavioral questions regarding "Customer Obsession" or "Deliver Results," you will be rejected.
- **Check for edge cases early.** Amazon values engineers who write robust code that won't crash production. Ask about null inputs, negative numbers, and massive constraints before you write a single line.
- **Prepare for the scale follow-up.** Always be ready to explain how your algorithm would change if the data didn't fit in memory (External Sorting, MapReduce, Database Sharding).
