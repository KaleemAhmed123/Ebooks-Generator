# AI Engineering: From Scratch

## Tools and the Model Context Protocol (MCP)

An LLM is isolated. It cannot execute code, read a live API, or check a calendar. 

### Function Calling (Tool Use)

We bridge this gap via **Function Calling**. You pass the LLM a JSON Schema describing your local functions (e.g., `get_weather(location: string)`). If the model decides it needs the weather, it halts generation and outputs a structured JSON payload requesting that function. Your application executes the actual code, then passes the result back to the LLM to resume generation.

### The Model Context Protocol (MCP)

Historically, every AI app (Claude, Cursor, custom agents) had to write bespoke integration code for every tool (GitHub, Postgres, Slack). 

**MCP** (standardized in 2026) solved this $N \times M$ integration nightmare. It is a universal JSON-RPC protocol. You write an MCP Server for your database once. Any MCP-compliant AI Client can instantly discover the server's tools, read its resources, and invoke its prompts. It transformed AI agents from isolated chatbots into universal system orchestrators.
