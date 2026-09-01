## When to skip all of this

- Spec-driven development is process, and **process applied to small work is pure cost**
- Knowing when to skip it is what stops the practice from being abandoned entirely

### Skip it for

| Work | Instead |
|---|---|
| a typo, a rename, a one-line fix | just do it |
| a change you can fully describe in one sentence | one sentence is the spec |
| exploration, where the goal is to learn | try things, throw them away |
| a spike or a prototype | **explicitly** throwaway, and say so |
| a change entirely inside one function | a good prompt is enough |

### Use it for

- Anything touching **more than about three files**
- Anything with a **schema change** or an API contract change
- Anything where **getting it wrong is expensive**: money, permissions, data migration
- Anything **more than one person** will work on
- Anything you will need to explain in six months

### The honest failure mode of SDD

- **Ceremony for its own sake.** A four-file specification package for a two-hour change is slower than writing it by hand, and everyone can tell
- **A spec written after the code**, to satisfy a process. It is a lie with a template
- **Specs nobody reads.** If reviews never reference the spec, the spec is not doing anything

### The test

- **Would writing this down change what gets built, or catch a mistake?** If yes, write it. If no, skip it and say you are skipping it
