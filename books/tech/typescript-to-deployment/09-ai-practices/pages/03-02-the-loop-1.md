## The loop

- Four steps, and **the first two are the ones that matter**, because they are the two you review

### 1. Specify

- What the change is, why, what it touches, what done looks like, and what is deliberately out of scope
- **Written before any code is generated**, and reviewed like a design document

### 2. Plan

- The approach, the files it will touch, the order of the steps, and the alternatives that were rejected
- **Reviewing this is where you catch a wrong architecture**, in two minutes, before anything is written

### 3. Decompose

- A numbered checklist of small, independently verifiable steps
- **Each step should be reviewable on its own.** That is the constraint that keeps a large change tractable

### 4. Implement

- One step at a time, with tests, ticking them off as they go
