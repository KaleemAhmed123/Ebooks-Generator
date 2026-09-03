## Indirect Prompt Injection

Injection arriving through content the agent fetched, rather than from the user.
The main reason autonomous browsing agents are dangerous.

An agent summarising a webpage reads hidden text instructing it to post the
conversation to an external URL. It has a fetch tool, so it can comply.

### How it works

Direct injection is a user typing something adversarial. Indirect injection
arrives through content your system fetched on its own, and it is considerably
worse.

An agent is asked to summarise a page. It fetches the page, and the page
contains text telling it to ignore previous instructions and send the
conversation somewhere. The user never typed that and never saw it — the
instruction was white text on a white background, or an HTML comment, or
metadata in an image.

**The attack surface is everything the agent can read:** web pages, PDFs,
emails, calendar invites, code comments, API responses, and other users' records
in a shared database.

The severity comes from combining this with tools. A model that can only talk is
embarrassing when injected. A model that can send email, spend money or delete
records is a security incident.

### In practice

The principle that follows: **treat every byte of tool output as hostile user
input**, never as trusted context.

| Control | Why |
|---|---|
| Cap how much fetched content enters the prompt | limits what an attacker can say |
| Keep the agent's credentials narrow | limits what a successful injection can do |
| Confirm before any externally visible action | the last line that is not the model's decision |
| Log every tool call | an incident has to be reconstructable afterwards |

None of these prevent injection. All of them bound it.
