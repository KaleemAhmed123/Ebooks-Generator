## What your job becomes

- The work does not disappear. It moves, and the parts it moves to are the parts that were always the hard ones

| Less of | More of |
|---|---|
| typing implementations | deciding what should exist |
| looking up an API | judging whether an approach fits |
| writing boilerplate | writing the specification that produces it |
| the first draft | **the review** |
| remembering syntax | knowing when something is subtly wrong |

### The three skills that got more valuable

- **Precise specification.** Vague input produces plausible output that is not what you wanted. Module 3 is entirely about this
- **Fast, honest review.** Reading a diff you did not write, and being willing to reject it. Module 5
- **System understanding.** Knowing what a change touches, what it breaks, and what the existing conventions are. Nothing generates this for you

### The skill that got less valuable, and it is a smaller one than people claim

- **Recall of syntax and API surface.** Genuinely less important now
- **Understanding what those APIs do** is not less important. It is what makes review possible at all

### The trap

- **Accepting a change you could not have written and cannot explain.** It compiles, the tests pass, and you have added something to the system that nobody understands
- The first time it breaks, there is nobody to ask, because the person who would know is the person who skipped reading it
- **The rule for the rest of this booklet: you own every line you merge**, whoever or whatever typed it
