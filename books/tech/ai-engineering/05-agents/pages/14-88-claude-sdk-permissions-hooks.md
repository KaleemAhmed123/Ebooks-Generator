## Claude Agent SDK: permissions and hooks

- An agent that can edit files and run shell commands is powerful and dangerous. The SDK's **permission system** and **hooks** are how you keep that power controlled. **[VERIFY current API]**

<svg viewBox="0 0 360 90" role="img" aria-label="A tool call passes through permission checks and hooks that can allow, block, or modify it" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="34" width="66" height="24" rx="3" fill="#24405e"/><text x="43" y="49" text-anchor="middle" fill="#fff" font-size="6">tool call</text>
  <rect x="96" y="30" width="80" height="32" rx="3" fill="#a03050"/><text x="136" y="44" text-anchor="middle" fill="#fff" font-size="6">permission +</text><text x="136" y="54" text-anchor="middle" fill="#fc8" font-size="6">hook</text>
  <rect x="200" y="16" width="80" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="240" y="28" text-anchor="middle" font-size="6">allow</text>
  <rect x="200" y="38" width="80" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="240" y="50" text-anchor="middle" font-size="6">block / ask</text>
  <rect x="200" y="60" width="80" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="240" y="72" text-anchor="middle" font-size="6">modify</text>
  <path d="M76 46 L94 46" stroke="#888" marker-end="url(#ph)"/><path d="M176 42 L198 26" stroke="#888" marker-end="url(#ph)"/><path d="M176 46 L198 46" stroke="#888" marker-end="url(#ph)"/><path d="M176 50 L198 66" stroke="#888" marker-end="url(#ph)"/>
  <defs><marker id="ph" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Permission modes** control how much the agent can do without asking — from "ask before every file write or command" to "auto-approve reads but confirm writes" to broader autonomy in a trusted sandbox. This is the human-in-the-loop of 14-52, tuned per tool and per risk: consequential actions (delete, deploy, spend) gate on approval; safe ones (read, search) run freely.
- **Hooks** are your callbacks at points in the loop — *before* a tool runs, *after* it returns, at session start. A pre-tool hook can inspect a command and **block, allow, or modify** it ("never let the agent run `rm -rf`", "add `--dry-run` to deploys", "log every write"). Hooks are deterministic guardrails *you* control, sitting around the model's non-deterministic choices.
- Together they make an autonomous file-and-shell agent **safe enough to trust**: the model proposes, your permissions and hooks dispose. This is the layered defense of 13-49 and the propose-then-commit pattern (Module 15) built into the harness.

:::warn
The lesson from running file-and-shell agents at scale: **never give an agent unconstrained execution on a system with real data or credentials.** Use permission modes to gate destructive actions, hooks to hard-block dangerous commands, and a sandboxed working directory. An agent that can run arbitrary bash is one hallucinated command away from deleting your work — the permission and hook layer is not optional hardening, it is the thing that makes such an agent usable in the first place.
:::
