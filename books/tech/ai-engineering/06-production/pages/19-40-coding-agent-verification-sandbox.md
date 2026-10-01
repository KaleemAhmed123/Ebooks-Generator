## Coding agent: verification gates and sandbox

- A coding agent that *claims* it fixed the bug is worthless; one that *proves* it by running the tests is a system. **Verification gates** make the agent's work checkable, and the **sandbox** makes running its code safe.

:::mint
```python
def verified_edit(registry, apply_fn, test_cmd):
    snapshot = registry.dispatch("git_stash_snapshot", {})   # reversible
    apply_fn()                                                # agent's edit
    result = registry.dispatch("run_in_sandbox", {"cmd": test_cmd})
    if result["exit_code"] != 0:
        registry.dispatch("git_restore", {"snapshot": snapshot})  # roll back
        return {"ok": False, "output": result["output"]}     # feed failure back
    return {"ok": True}
```
:::

- **The gate turns claims into evidence.** After an edit, run the tests *in the sandbox*; if they fail, roll back and feed the failure to the model to try again. The agent cannot mark a task done until a gate it does not control (the test suite) passes — Booklet 5's verification-gate craft, enforced in code.
- **The sandbox is the safety boundary.** The agent's code runs in an isolated environment (a container, a jailed process) with **no network by default**, a **filesystem denylist** (can't touch `~/.ssh`, credentials, or outside the repo), resource limits, and a timeout. So a buggy or hijacked agent damages a throwaway sandbox, not your machine.

<svg viewBox="0 0 340 72" role="img" aria-label="Edit, then run tests in sandbox; pass commits, fail rolls back and retries" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="28" width="50" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="37" y="40" text-anchor="middle">edit</text>
  <rect x="82" y="28" width="70" height="18" rx="3" fill="#f3ede8" stroke="#8a6d3b"/><text x="117" y="40" text-anchor="middle" font-size="6">sandbox tests</text>
  <rect x="180" y="10" width="70" height="16" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="215" y="21" text-anchor="middle" font-size="6">pass → commit</text>
  <rect x="180" y="46" width="90" height="16" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="225" y="57" text-anchor="middle" font-size="6">fail → rollback + retry</text>
  <path d="M62 37 L80 37" stroke="#888" marker-end="url(#vg)"/><path d="M152 33 L178 20" stroke="#888" marker-end="url(#vg)"/><path d="M152 41 L178 54" stroke="#888" marker-end="url(#vg)"/>
  <defs><marker id="vg" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

:::note
Verification + sandbox is what lets a coding agent run *unattended*. Without the gate, you must review every edit (no autonomy); with it, the agent self-corrects against an objective signal (tests) until it succeeds or gives up, and the sandbox means a wrong turn is reversible and contained. This is the concrete form of Module 18's AI-control philosophy — assume the agent may be wrong or hijacked, and design so a bad action is caught by an independent check and confined to a throwaway environment.
:::
