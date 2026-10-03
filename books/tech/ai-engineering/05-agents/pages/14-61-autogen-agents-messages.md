## AutoGen: agents and messages

- The building block is an **agent** with a role, an LLM, and optionally tools. You create a few, give each a system prompt defining its job, and set them talking.

:::mint
```python
from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient

model = OpenAIChatCompletionClient(model="gpt-...")

writer = AssistantAgent("writer", model_client=model,
    system_message="You write concise marketing copy.")
critic = AssistantAgent("critic", model_client=model,
    system_message="You critique copy and demand revisions until it's crisp.")
```
:::

- **An `AssistantAgent` is an LLM-backed agent**; its `system_message` is its identity and job. A `UserProxyAgent` represents the human (and can execute code/tools on their behalf) — it is how a person, or automated stand-in for one, joins the conversation.
- **Agents communicate by messages.** You start a conversation and agents send messages back and forth — the writer drafts, the critic responds, the writer revises. Each agent decides its reply from the messages it receives, using its own LLM and prompt.
- **Termination** is explicit: a conversation ends on a condition — a max message count, a keyword like `"APPROVED"`, or a custom check. As with any agent loop (14-05), you must define when the talking stops, or agents chat indefinitely.

<svg viewBox="0 0 360 64" role="img" aria-label="A writer and critic agent exchange messages until an approval terminates the conversation" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="14" y="22" width="70" height="20" rx="3" fill="#24405e"/><text x="49" y="35" text-anchor="middle" fill="#fff">writer</text>
  <rect x="140" y="22" width="70" height="20" rx="3" fill="#6a9bd0"/><text x="175" y="35" text-anchor="middle" fill="#fff">critic</text>
  <rect x="268" y="22" width="80" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="308" y="35" text-anchor="middle">"APPROVED"→end</text>
  <path d="M84 28 L138 28" stroke="#888" marker-end="url(#am)"/><path d="M138 38 L86 38" stroke="#888" marker-end="url(#am)"/><path d="M210 32 L266 32" stroke="#888" marker-end="url(#am)"/>
  <defs><marker id="am" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

:::interview
"How do you build a writer-critic loop in AutoGen?"

Create two `AssistantAgent`s with distinct system messages — one that writes, one that critiques and demands revisions — and put them in a conversation. They exchange messages (draft → critique → revise) until a termination condition fires: a keyword like "APPROVED", a max turn count, or a custom check. It's the evaluator-optimizer pattern (14-40) expressed as two conversing agents, and the key thing you must set is the *stop condition*, or they talk forever.
:::
