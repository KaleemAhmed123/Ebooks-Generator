## Claude Agent SDK: a worked agent

- The harness in use: a small agent that fixes a failing test in a repo. The code is illustrative of the SDK's query-and-options shape.

:::mint
```python
from claude_agent_sdk import query, ClaudeAgentOptions

options = ClaudeAgentOptions(
    system_prompt="You are a coding agent. Fix the failing test.",
    allowed_tools=["Read", "Edit", "Bash", "Grep"],   # scope the toolset
    permission_mode="acceptEdits",                     # auto-accept file edits
    cwd="/path/to/repo",
)

async for message in query(
    prompt="Run the tests, find the failure, fix it, re-run until green.",
    options=options,
):
    print(message)        # stream the agent's steps
```
:::

- **Trace what the agent does:** runs the tests (`Bash`) → reads the failure output → searches (`Grep`) for the relevant code → reads the file (`Read`) → makes a targeted `Edit` → re-runs the tests → repeats until green. It is the agent loop (14-03) over a real repo, with context automatically compacted (14-86) as the transcript grows.
- **Notice the controls:** `allowed_tools` scopes what it can do (13-15, least privilege); `permission_mode` decides how much runs without asking (14-88); `cwd` sandboxes it to one repo. You get autonomy *bounded* by explicit configuration — the propose-and-gate design.
- **This is essentially "Claude Code as a library."** The same loop, tools, and safeguards that run the interactive coding agent, driven programmatically for your own automation.

:::interview
"How would you build an agent that autonomously fixes failing tests?"

Use an agent harness with file, shell, and search tools (the Claude Agent SDK is purpose-built for this). Prompt it to run the tests, locate the failure, edit the code, and re-run until green — the agent loop over a real repo. Crucially, bound it: scope `allowed_tools` to what's needed, set a permission mode that gates or auto-accepts appropriately, sandbox it to the repo's working directory, and rely on automatic context compaction for the long transcript. The intelligence is the model; the reliability and safety are in the harness configuration.
:::
