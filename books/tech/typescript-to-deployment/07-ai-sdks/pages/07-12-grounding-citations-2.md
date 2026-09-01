### Why the structured shape earns its place

- **`sourceIds` can be verified in code.** An id the model did not receive means the answer was invented, and that is now detectable
- **`answered: false` is a first-class outcome.** Without it, an unanswerable question produces a confident guess
- The ids map back to document and page, which is what turns a citation into a link the user can open

### The rules

- **Number the sources and require the id.** Asking for a document name invites a plausible invented one
- **Show the citations in the interface.** A user who can check the source catches the error you did not
- Give the model permission to fail. An assistant that says it does not know is more useful than one that never does
