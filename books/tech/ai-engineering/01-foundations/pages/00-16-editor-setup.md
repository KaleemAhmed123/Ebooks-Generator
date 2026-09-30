## The editor

- Your editor is where most hours go. **VS Code** is the common default for AI work: free, fast, with first-class Python and notebook support in one window.
- The point of a good setup is a faster feedback loop — errors caught as you type, not when you run.

### What earns its place

- **Python + Pylance extensions** — autocomplete, jump-to-definition, and type errors flagged inline before you run.
- **Ruff** — an extremely fast linter and formatter (from Astral, the makers of uv). It fixes style and catches dead code on save.
- **Jupyter support** — run notebook cells inside the editor, next to your scripts, sharing one environment.
- **Point it at your uv environment** so autocomplete reflects the exact packages the project uses.

:::note
AI-assisted editors are now standard, not optional. VS Code with an agent (Claude Code, Copilot, Cursor) writes boilerplate, explains errors, and drafts tests. As of 2026 the skill is not typing code fast — it is directing an AI assistant well and reviewing what it produces. This book's own workflow is built that way.
:::

:::warn
Let the AI assistant draft, but read every line before you accept it — especially anything touching data, money, or secrets. Confidently wrong code that looks right is the failure mode. The assistant proposes; you remain accountable for what ships.
:::
