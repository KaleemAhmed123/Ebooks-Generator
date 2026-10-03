## Claude Agent SDK: built-in tools

- Most agent frameworks make you supply every tool. The Claude Agent SDK ships a **capable default toolset** for operating a computer, so an agent is useful out of the box.

<svg viewBox="0 0 360 88" role="img" aria-label="Built-in tools: read, write, edit files; run bash; search files and content; fetch web; call MCP" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="104" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="62" y="30" text-anchor="middle">file: read/write/edit</text>
  <rect x="126" y="16" width="104" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="178" y="30" text-anchor="middle">bash: run commands</text>
  <rect x="242" y="16" width="108" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="296" y="30" text-anchor="middle">search: glob/grep</text>
  <rect x="10" y="44" width="104" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="62" y="58" text-anchor="middle">web: fetch/search</text>
  <rect x="126" y="44" width="104" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="178" y="58" text-anchor="middle">MCP: any server</text>
  <rect x="242" y="44" width="108" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="296" y="58" text-anchor="middle">custom: your funcs</text>
</svg>

- **File operations** — read, write, and *targeted edit* of files. The edit tool changes specific parts of a file rather than rewriting it whole, which is safer and cheaper for code — a detail that matters for reliable code editing.
- **Bash / terminal** — run shell commands and read their output. This single tool is enormous: it lets the agent run tests, build, install packages, use git, and drive any CLI — the whole developer toolchain becomes available through one door.
- **Search** — find files by pattern (glob) and content (grep), so the agent navigates a large codebase without loading it all into context (the context economy of 14-06).
- **Web fetch/search, MCP, and custom tools** round it out — the agent can pull live docs, connect to any MCP server (13-27), and use functions you add.

:::note
The built-in toolset encodes hard-won lessons about what a *working* agent needs: not a dozen bespoke API wrappers, but the primitives of a computer — files, a shell, search. Give an agent those and it can do almost anything a developer can, because the shell alone is a universal tool. This is why "give it a computer" beats "give it a curated API list" for open-ended work: you cannot anticipate every tool, but a terminal covers the long tail.
:::
