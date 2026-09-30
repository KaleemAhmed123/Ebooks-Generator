## AutoGen: tools and code execution

- AutoGen agents use tools like any agent (13-05), but its signature feature is **code execution**: an agent writes code, and a designated executor *runs* it — then the agent reads the output and continues. This makes AutoGen strong for data analysis, computation, and engineering tasks. **[VERIFY current API]**

<svg viewBox="0 0 360 88" role="img" aria-label="A coder agent writes code, an executor runs it in a sandbox, and the result feeds back" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="32" width="70" height="24" rx="3" fill="#24405e"/><text x="47" y="47" text-anchor="middle" fill="#fff" font-size="6">writes code</text>
  <rect x="112" y="28" width="90" height="32" rx="4" fill="#a03050"/><text x="157" y="42" text-anchor="middle" fill="#fff" font-size="6">executor</text><text x="157" y="53" text-anchor="middle" fill="#fc8" font-size="5.5">sandbox / Docker</text>
  <rect x="232" y="32" width="70" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="267" y="44" text-anchor="middle" font-size="6">output</text><text x="267" y="52" text-anchor="middle" font-size="5.5">stdout/err</text>
  <path d="M82 44 L110 44" stroke="#888" marker-end="url(#ac)"/><path d="M202 44 L230 44" stroke="#888" marker-end="url(#ac)"/><path d="M267 56 Q267 78 47 74 L47 58" stroke="#888" fill="none" marker-end="url(#ac)"/>
  <text x="180" y="84" text-anchor="middle" font-size="5.5" fill="#6b6b6b">agent reads the result and iterates (evaluator-optimizer with a real runtime)</text>
  <defs><marker id="ac" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The loop:** an agent generates code → the executor runs it (ideally in a **Docker sandbox**, not the host) → the real stdout/stderr comes back → the agent sees whether it worked and fixes or continues. This is evaluator-optimizer (14-40) with the *runtime itself* as the evaluator — the most trustworthy critic there is, because the code either runs or it does not.
- **Why it is powerful for analysis:** ask "analyze this CSV and plot the trend" and the agent writes pandas/matplotlib code, runs it, reads errors, corrects them, and returns the real result — not a hallucinated answer. The ground truth of execution keeps it honest.
- **Tools too.** Beyond code, you register functions as tools on an agent exactly as in 13-05; AutoGen handles the tool-call round trip.

:::warn
Code execution is a loaded gun pointed at your machine. An agent running model-generated code can delete files, exfiltrate data, or worse — the sandbox/permission concerns of 13-49 in their most acute form. **Always run agent code in an isolated sandbox** (Docker, a locked-down container, a disposable VM), never directly on a host with real credentials or data. "It worked in the demo on my laptop" is how a code-executing agent becomes a security incident.
:::
