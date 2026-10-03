# Sources — 09 Tech radar

> Accessed 2026-10-03. Verification note: this session's network policy blocked
> direct fetches of thoughtworks.com, linuxfoundation.org, modelcontextprotocol.io,
> stackoverflow.blog, metr.org, clickhouse.com and most news sites. Three kinds
> of evidence were reachable directly and are treated as primary: the PyPI JSON
> API, the npm registry, and files on raw.githubusercontent.com (spec changelogs,
> READMEs, CHANGELOGs). Everything else was checked through search-result
> extracts of the original page, not full text. Where only a secondary page
> carried a number, the number was cut or the claim is graded C.

## How radars work

[S1] Technology Radar FAQ — Thoughtworks — undated, live 2026-10 — https://www.thoughtworks.com/radar/faq — docs — Grade A (for their own process)
     Blips, four quadrants, four rings; written by the ~20-person Technology Advisory Board; blips fade after one edition unless they move.

[S2] How we create the Technology Radar — Thoughtworks — undated — https://www.thoughtworks.com/insights/blog/how-we-create-technology-radar — docs/essay — Grade A (own process)
     Nomination from across the company (~367 proposals in one cycle), ring-by-ring voting with coloured cards, a "Doppler" group curates to ~100 blips.

[S3] Build Your Own Radar — Thoughtworks — undated — https://www.thoughtworks.com/radar/byor — docs — Grade A
     Ring meanings in short form: Adopt = recommended for general use; Trial = test in a controlled way, on projects whose risk profile can absorb it; Assess = watch closely, explore to understand impact; Hold = do not use (immature or on the way out).

[S4] Key themes in Technology Radar Vol. 34 — Thoughtworks — 2026-04 — https://www.thoughtworks.com/insights/podcasts/technology-podcasts/themes-technology-radar-34 — podcast page — Grade B
     Vol. 34 themes: evaluating technology in an agentic world; retaining principles, relinquishing patterns; securing permission-hungry agents; putting coding agents on a leash.

[S5] Context engineering (blip) — Thoughtworks Radar — 2026-04 — https://www.thoughtworks.com/radar/techniques/context-engineering — practitioner radar — Grade B
     Placed in Adopt; context window treated as a design surface; progressive disclosure, prompt caching, compression via sub-agents.

[S6] Model Context Protocol (blip) — Thoughtworks Radar — 2025-11-05 — https://www.thoughtworks.com/radar/platforms/model-context-protocol-mcp — practitioner radar — Grade B
     MCP placed in Trial, not Adopt.

[S7] Agent Skills (blip) — Thoughtworks Radar — 2026-04 — https://www.thoughtworks.com/radar/techniques/agent-skills — practitioner radar — Grade B
     Agent Skills placed in Trial; skills load on demand from their descriptions to cut context bloat.

[S8] LLM as a judge (blip) — Thoughtworks Radar — 2025-11 — https://www.thoughtworks.com/radar/techniques/llm-as-a-judge — practitioner radar — Grade B
     Moved from Trial back to Assess; cites position bias, verbosity bias, low robustness, self-enhancement bias.

[S9] Build your own technology radar (Neal Ford talks and podcast) — Thoughtworks / No Fluff Just Stuff — 2011–2013 — https://thoughtworks.com/insights/podcasts/technology-podcasts/build-your-own-radar-using-technology-radar-governance-tool — talk/podcast — Grade B
     A radar used by an individual for "personal breadth development", not only org governance.

## Durability signals and historical cases

[S10] CNCF Project Lifecycle & Process — CNCF — live 2026 — https://contribute.cncf.io/projects/lifecycle/ — docs — Grade A
     Sandbox → Incubating → Graduated; incubating needs production use by ≥3 independent end users, healthy committers; graduation needs committers from multiple organizations and a 2/3 TOC vote.

[S11] Apache Mesos — Apache Attic — 2025 — https://attic.apache.org/projects/mesos.html — docs — Grade A
     Mesos retired August 2025, Attic move completed October 2025; a 2021 retirement vote had been cancelled.

[S12] "Docker Swarm beats Kubernetes? Not so fast" — InfoWorld (Serdar Yegulalp) — 2016 — https://www.infoworld.com/article/3042573/docker-swarm-beats-kubernetes-not-so-fast.html — reporting — Grade B
     The benchmark showing Swarm faster at container start-up was commissioned by Docker.

[S13] Linux Foundation launches Valkey as a Redis fork — Phoronix — 2024-03-28 — https://www.phoronix.com/news/Linux-Foundation-Valkey — reporting — Grade B
     Redis moved to RSALv2/SSPLv1 in March 2024; LF, AWS, Google, Oracle and others forked Redis 7.2.4 under BSD within days. Redis 8 (May 2025) added AGPLv3 as an option (via secondary reporting).

[S14] Lessons from XZ Utils: Achieving a More Sustainable Open Source Ecosystem — CISA — 2024 — https://www.cisa.gov/news-events/news/lessons-xz-utils-achieving-more-sustainable-open-source-ecosystem — government analysis — Grade A
     CVE-2024-3094: a multi-year social-engineering campaign took over an under-resourced, effectively single-maintainer project.

[S15] Discontinued Long Term Support for AngularJS — Angular team — 2021/2022 — https://blog.angular.io/discontinued-long-term-support-for-angularjs-cc066b82e65a — official blog — Grade A
     Google ended AngularJS support on 2021-12-31 after moving its investment to Angular.

[S16] What happened to Bower? — Microsoft .NET blog — 2018-04-18 — https://devblogs.microsoft.com/dotnet/what-happened-to-bower/ — practitioner blog — Grade B
     Bower's maintainers recommended migrating to Yarn and Webpack; tooling that depended on it had to move.

[S17] "Error: Plugins are no longer supported" — OpenAI Developer Community — 2024-04 — https://community.openai.com/t/error-plugins-are-no-longer-supported/715523 — forum (official notices quoted) — Grade B
     ChatGPT plugins: no new plugin conversations after 2024-03-19; fully off 2024-04-09; replaced by GPTs.

[S18] Assistants API beta deprecation — August 26, 2026 sunset — OpenAI Developer Community — 2025 — https://community.openai.com/t/assistants-api-beta-deprecation-august-26-2026-sunset/1354666 — official notice on forum — Grade B (search extract only)
     Assistants API sunset 2026-08-26; migration to the Responses API.

[S19] AutoGen README — Microsoft — live 2026-10-03 — https://raw.githubusercontent.com/microsoft/autogen/main/README.md — repo docs — Grade A
     "AutoGen is now in maintenance mode. It will not receive new features"; new users pointed to Microsoft Agent Framework 1.0.

[S20] LiteLLM supply chain compromise — NetSPI — 2026-03 — https://www.netspi.com/blog/executive-blog/ai-ml-pentesting/litellm-supply-chain-compromise/ — security analysis — Grade B
     2026-03-24: versions 1.82.7 and 1.82.8 published with stolen maintainer credentials; credential-stealing `.pth` payload ran on interpreter start; live under five hours.

[S21] The Lindy effect, in Antifragile — Nassim Nicholas Taleb — 2012 — https://en.wikipedia.org/wiki/Antifragile_(book) — book/concept — Grade C
     For non-perishables, expected remaining life grows with age so far. A heuristic, not data.

## Current snapshot — primary data

[S22] PyPI JSON API snapshot (latest versions, release dates, release counts since 2026-07-05) — PyPI — pulled 2026-10-03 — https://pypi.org/pypi/<package>/json — registry data — Grade A
     Version, cadence and major-version dates for langgraph, mcp, fastmcp, pydantic-ai, openai-agents, claude-agent-sdk, google-adk, agent-framework-core, a2a-sdk, vllm, sglang, dspy, langfuse, ragas, autogen-agentchat, litellm and others. Figures quoted in the report and radar.

[S23] npm registry snapshot — npm — pulled 2026-10-03 — https://registry.npmjs.org/<package> — registry data — Grade A
     Version and cadence for ai (Vercel AI SDK), @modelcontextprotocol/sdk, @langchain/langgraph, @openai/agents, @anthropic-ai/claude-agent-sdk, @anthropic-ai/claude-code, @openai/codex, @mastra/core, promptfoo.

[S24] PyPI per-project release RSS feed — PyPI — live 2026-10-03 — https://pypi.org/rss/project/langgraph/releases.xml — registry feed — Grade A
     Every PyPI project exposes a releases feed; usable for the weekly scan.

[S25] MCP joins the Agentic AI Foundation — MCP blog — 2025-12-09 — https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/ — official announcement — Grade A (governance) / C (adoption numbers)
     AAIF co-founded by Anthropic, Block, OpenAI under the Linux Foundation; founding projects MCP, goose, AGENTS.md; MCP keeps technical autonomy. Self-reported "97M monthly SDK downloads, 10,000 active servers".

[S26] MCP 2026-07-28 Key Changes — modelcontextprotocol spec repo — 2026-07-28 — https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/main/docs/specification/2026-07-28/changelog.mdx — spec — Grade A
     Stateless core (no initialize handshake, no Mcp-Session-Id), server/discover, Multi Round-Trip Requests replace server-initiated requests, tasks moved to an extension, SSE resumability removed, cacheable list results, RFC 9207 issuer validation.

[S27] The 2026-07-28 Specification — MCP blog — 2026-07-28 — https://blog.modelcontextprotocol.io/posts/2026-07-28/ — official announcement — Grade A
     Tier 1 SDKs (TypeScript, Python, Go, C#) updated; Roots, Sampling, Logging deprecated with a 12-month window; legacy HTTP+SSE transport given a one-year off-ramp.

[S28] The New MCP Roadmap — MCP blog — 2026-08-22 — https://blog.modelcontextprotocol.io/posts/mcp-roadmap/ — official roadmap — Grade A
     Priorities: agentic messaging, HTTP-native transport, agent identity, better primitives, SDK DX; contributor ladder and deprecation policy adopted.

[S29] OpenTelemetry GenAI semantic conventions repo — OpenTelemetry — live 2026-10-03 — https://raw.githubusercontent.com/open-telemetry/semantic-conventions-genai/main/docs/gen-ai/gen-ai-spans.md — spec — Grade A
     GenAI conventions moved to their own repo; spans and attributes still marked "Development" (not Stable).

[S30] A2A protocol surpasses 150 organizations… — Linux Foundation press release — 2026 — https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year — press release — Grade C (self-reported adoption)
     A2A v1.0 shipped March 2026; support in Azure AI Foundry, Bedrock AgentCore, Google ADK. Move under AAIF reported for 2026-08-17 by secondary sources only (C).

[S31] LangChain and LangGraph 1.0 — LangChain blog — 2025-10 — https://www.langchain.com/blog/langchain-langgraph-1dot0 — vendor announcement — Grade A (fact of release) / C (customer claims)
     LangGraph 1.0 with no breaking changes; durable execution, persistence, human-in-the-loop. PyPI confirms langgraph 1.0.0 on 2025-10-17 [S22].

[S32] ClickHouse welcomes Langfuse — ClickHouse blog — 2026-01-16 — https://clickhouse.com/blog/clickhouse-acquires-langfuse-open-source-llm-observability — company announcement — Grade A (fact) / C (intent)
     Acquisition; Langfuse core stays MIT and self-hostable; Langfuse Cloud continues.

[S33] AGENTS.md README — agentsmd/agents.md — live 2026-10-03 — https://raw.githubusercontent.com/agentsmd/agents.md/main/README.md — repo docs — Grade A
     "A simple, open format for guiding coding agents" — a README for agents.

[S34] Agent Skills open standard (agentskills.io) — secondary roundups (noqta.tn, danielvaughan.com) — 2026-04/05 — https://codex.danielvaughan.com/2026/05/05/agent-skills-open-standard-portable-skills-codex-cli-cross-agent/ — blog — Grade C
     Spec published December 2025; claims of 30+ adopting tools including Codex CLI and Gemini CLI. Count not independently verified.

[S35] pgvector CHANGELOG — pgvector — live 2026-10-03 — https://raw.githubusercontent.com/pgvector/pgvector/master/CHANGELOG.md — repo docs — Grade A
     0.8.5 (2026-07-08), 0.8.6 (2026-07-29), 0.8.7 (2026-10-01): steady bug-fix releases; supports Postgres 13+.

## Coding agents and trust

[S36] Stack Overflow 2025 Developer Survey (AI section), as reported — InfoWorld (Paul Krill) — 2025-07 — https://www.infoworld.com/article/4031673/ai-use-among-software-developers-grows-but-trust-remains-an-issue-stack-overflow-survey.html — survey reporting — Grade B
     84% use or plan to use AI tools; 46% distrust AI accuracy vs 33% trust; 66% cite "almost right, but not quite".

[S37] Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity — METR — 2025-07-10 — https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ — RCT — Grade A (via abstracts and reporting)
     16 developers, 246 tasks in their own repos: 19% slower with AI while believing they were ~20% faster.

[S38] METR changes its developer productivity experiment design — METR, as reported by i-programmer and birchtree.me — 2026 — https://birchtree.me/blog/an-update-from-the-study-that-said-devs-were-actually-slower-with-coding-agents/ — reporting on study update — Grade B
     2026 replication hit selection bias: developers declined to work without AI. METR thinks speed-up is likely higher in early 2026 but calls its data "very weak evidence" of the size.

[S39] Agents on a leash: agentic AI remains mostly monitored at work — Stack Overflow blog — 2026-05-27 — https://stackoverflow.blog/2026/05/27/agents-on-a-leash-agentic-ai-remains-mostly-monitored-at-work/ — survey blog — Grade B
     Agent use is rising and mostly supervised. The percentages surfaced by search contradicted each other, so no number from it is used.

## Signal sources and career value

[S40] Notes from Simon Willison's interview on Software Misadventures — Michael Lynch — 2024 — https://mtlynch.io/notes/simon-willison-software-misadventures/ — notes on interview — Grade C
     Willison says the highest-signal AI information comes from private group chats, not public feeds.

[S41] AI Model Releases: September 2026 Tracker — digitalapplied.com — 2026-09 — https://www.digitalapplied.com/blog/ai-model-releases-september-2026-tracker — SEO aggregator — Grade C
     Kept as evidence of noise: a standard search for "model releases September 2026" returned mostly aggregator pages with unsourced claims.

[S42] All Are Not Equal: An Examination of the Economic Returns to Different Forms of Participation in Open Source Software Communities — Hann, Roberts, Slaughter, Information Systems Research 24(3):520–538 — 2013 — https://doi.org/10.1287/isre.2013.0474 — study (panel data, Apache) — Grade A (via abstract)
     Contribution volume alone did not raise wages; merit-based rank in Apache did, by 13–27% depending on rank. Visible credentials signal, private work doesn't.
