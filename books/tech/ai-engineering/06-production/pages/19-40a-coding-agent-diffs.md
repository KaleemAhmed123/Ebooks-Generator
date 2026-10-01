## Coding agent: editing files reliably

- How an agent *applies* changes decides its reliability. Asking the model to rewrite a whole file is wasteful and error-prone (it drops code it didn't mean to); asking for a precise **edit** is the production pattern.

:::mint
```python
# search-replace edit: model emits the exact old block and the new block
def apply_edit(path, old_block, new_block):
    content = open(path).read()
    if content.count(old_block) != 1:                 # must be unique or reject
        return {"error": "old_block not found uniquely — re-read the file"}
    open(path, "w").write(content.replace(old_block, new_block))
    return {"ok": True}
```
:::

- **Search-replace beats full-rewrite.** The model emits the *exact* text to replace and its replacement; the harness verifies the old block appears *exactly once* (else it rejects and the model re-reads) and applies it. This is far more reliable than regenerating the file (no accidental deletions), cheaper (fewer output tokens), and reviewable (a clean diff). It's the mechanism behind production coding agents' edit tools.
- **The uniqueness check is the safety gate.** If the old block isn't unique or isn't found, applying it would edit the wrong place or corrupt the file — so the harness *refuses* and returns an error the model can act on (re-read, include more surrounding context to disambiguate). Never apply an ambiguous edit.

:::note
This closes the loop with the verification gate (19-40): the *diff* is what makes an agent's change reviewable — a human (or a reviewer agent) reads a precise search-replace edit far more easily than a regenerated file, and the test gate then proves it works. Reliable file editing plus test verification plus a clean diff is the trio that makes a coding agent *trustworthy* to run against a real repo. The lesson generalises: constrain the model to emit *precise, verifiable operations* (a unique edit, a validated tool call) rather than freeform output you have to trust.
:::
