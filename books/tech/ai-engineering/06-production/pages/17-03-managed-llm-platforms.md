## The three hyperscaler platforms

- If you stay managed but want cloud controls (VPC, IAM, one bill, compliance), you go through a hyperscaler. Three exist, and each made a **different bet** on who owns the model layer.

| Platform | Strategy | Catalog | Best at |
|---|---|---|---|
| **AWS Bedrock** | marketplace | Claude, Llama, Mistral, Titan, Cohere | model optionality, cleanest cost attribution |
| **Azure OpenAI** | exclusive partner | GPT / o-series, DALL·E, Whisper | enterprise controls on OpenAI, dedicated capacity |
| **Google Vertex AI** | Gemini-first | Gemini + Model Garden | long context, multimodal |

- **Bedrock** is a store: many vendors behind one API and one IAM surface. Its bet is that you want choice more than a single model.
- **Azure OpenAI** sells OpenAI models only, inside Azure datacentres with enterprise governance. Non-OpenAI models live in a separate product (Azure AI Foundry).
- **Vertex** leads with Gemini and its long-context, multimodal story; third-party models sit in Model Garden.

- **Latency gap is a capacity story, not a quality story.** On equivalent large-model deployments, Azure with dedicated capacity benchmarks faster median first-token latency than Bedrock on shared on-demand — because dedicated GPUs do not compete with other tenants' traffic.

:::note
The decision rule is **not "which is fastest."** It is *"which model catalog and cost-attribution surface fit my product?"* Bedrock gives per-product cost breakouts natively; Vertex gives arbitrary SQL over billing via BigQuery; Azure is the most opaque unless you instrument it. Pick on catalog and FinOps, then tune latency with dedicated capacity if the SLA demands it.
:::
