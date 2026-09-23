## Phase 1: Understand and Clarify

When the interviewer finishes reading the problem, do not immediately start thinking about algorithms. Your first job is to lock down the exact requirements.

### 1. Repeat the Problem

Repeat the core requirement back in your own words.
- *Interviewer:* "Given a list of words, find the longest compound word that can be built from other words in the list."
- *You:* "Okay, so if the list has 'cat', 'cats', 'dog', and 'catsdog', the answer is 'catsdog' because it's built from 'cats' and 'dog'. Is that correct?"

This immediately proves you are listening and prevents you from spending 40 minutes solving the wrong problem.

### 2. Lock Down the Constraints

If the interviewer didn't give you constraints, you must ask for them. The constraints dictate the algorithm.

- "What is the maximum length of the array?"
- "What is the maximum size of the numbers? Can they be negative?"
- "Are there duplicate elements?"

### 3. Probe the Edge Cases

Write these down as comments at the top of your file. They serve as a checklist for your dry-run later.

- "Can the input array be empty?"
- "What should I return if no valid answer exists?" (e.g., `-1`, `[]`, or throw an error?)
- "Is the string strictly lowercase English letters, or can it contain Unicode?"

### The Trap: Assuming Standard Input

If the problem involves a Graph, ask:
- "Is it directed or undirected?"
- "Can it have cycles?"
- "Can there be disconnected components?"

If it involves a Tree:
- "Is it a Binary Search Tree, or just a generic Binary Tree?"
- "Is it guaranteed to be balanced?"

Taking 3 minutes to ask these questions projects seniority. It shows you know how systems break in production.
