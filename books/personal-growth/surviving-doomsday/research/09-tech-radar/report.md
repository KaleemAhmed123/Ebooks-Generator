# Tech radar: picking up new tech before others
> As of 2026-10-03 · Status: draft

Verification caveat: thoughtworks.com, linuxfoundation.org, modelcontextprotocol.io,
stackoverflow.blog and metr.org were blocked in this session. Package registries
(PyPI, npm) and raw GitHub files were reachable and are the backbone of the
snapshot. Everything else was checked against search extracts (see the note in
`sources.md`). The dated placements live in `radar.md`. `research/01-landscape/`
did not exist when this was written, so nothing here leans on it.

## Bottom line

- **The durable part of AI engineering right now is protocols and techniques,
  not frameworks.** MCP moved to neutral Linux Foundation governance with a
  formal deprecation policy [S25][S28]. Context engineering hit Thoughtworks'
  Adopt ring [S5]. Meanwhile the frameworks keep shipping majors: Vercel AI SDK
  every ~6 months, Pydantic AI 1.0 → 2.0 in under 10 months [S22][S23]. Bet
  career capital on the protocols and techniques; rent the frameworks.
  (confidence: medium-high)
- **The best predictor of death isn't weak backing. It's a backer with a
  replacement.** AngularJS, ChatGPT plugins, the Assistants API and AutoGen all
  had giant backers. Each was ended by that backer's next product
  [S15][S17][S18][S19]. Neutral, multi-vendor governance is what has protected
  technologies, for example Kubernetes, and Valkey after the Redis relicense
  [S10][S12][S13]. (confidence: medium; the cases are chosen for illustration,
  not sampled)
- **Registries and spec changelogs beat newsletters for signal.** Release
  cadence, major-version dates, yanked versions and maintenance banners are
  primary data, free and machine-readable [S22][S24][S19]. In this very session,
  searching for model news returned mostly SEO aggregators [S41]. (confidence:
  high for registries as primary data; ranking of other sources is my judgement)
- **Being early pays only when it's visible.** The best wage evidence on open
  source shows contribution volume alone didn't raise pay, while visible,
  merit-based rank did, by 13–27% [S42]. For a profile whose bottleneck is
  distribution, every spike should end in a published verdict. (confidence:
  medium; one study, one community, pre-AI era)
- **For this profile, the radar's job is to stop chasing.** Seven Adopt items
  cover client work today (`radar.md`). New time should go to MCP servers on the
  2026-07-28 spec, eval gates, and writing up both, not to the next agent
  framework. (confidence: medium; I infer from the evidence plus `profile.md`)

## What the evidence says

### 1. How established radars work, and what one person can borrow

- **Mechanics.** The Thoughtworks Radar is written by the Technology Advisory
  Board, about 20 senior technologists. Proposals come from across the company
  (around 367 in one cycle). The group votes ring by ring with coloured cards,
  and a curation group cuts it to about 100 blips [S1][S2] (A, their own
  process). Blips sit in four quadrants (techniques, tools, platforms,
  languages and frameworks) and four rings [S1] (A).
- **Rings.** Adopt means recommended for general use. Trial means test in a
  controlled way on projects that can absorb the risk. Assess means watch and
  explore. Hold means don't use: immature or on the way out [S3] (A).
- **Fading.** A blip appears for one edition unless it moves rings. That rule
  saves space on a printed radar; it isn't a verdict on the item [S1] (A).
- **Personal use is intended.** Neal Ford framed the radar as a tool for
  "personal breadth development", not only governance [S9] (B).
- **What transfers to one person, I infer:** (a) the four rings, re-defined
  around what *I* sell (see `radar.md`); (b) the written reason per blip, which
  is the real asset; (c) the twice-yearly cadence, tightened to quarterly. What
  doesn't transfer: the wisdom of a crowd. One person has no 20-voter jury, so
  the substitute is primary data (registries, specs) plus a time-boxed spike.
  Also drop the fade rule: a personal file should remember.

### 2. Signals that predict lasting vs fading

| Signal | Why it predicts | Lasted | Faded |
|---|---|---|---|
| **Neutral, multi-vendor governance** | No single company can kill it or relicense it. CNCF graduation *requires* committers from several organisations and production users [S10] (A). | Kubernetes, despite a Docker-commissioned benchmark favouring Swarm [S12] (B). Valkey forked within days of the Redis relicense [S13] (B). MCP under AAIF [S25] (A). | Apache Mesos: a retirement vote in 2021 was cancelled, but it retired in Aug 2025 [S11] (A). |
| **Backer has a replacement** | The backer's incentive flips from maintaining to migrating you. | — | AngularJS, ended 2021-12-31 for Angular [S15] (A). ChatGPT plugins, off 2024-04-09 for GPTs [S17] (B). Assistants API, sunset 2026-08-26 for Responses [S18] (B). AutoGen, maintenance mode for Agent Framework [S19] (A). |
| **Maintainer health** | Single maintainers burn out or get taken over. | — | xz: a multi-year social-engineering takeover of an under-resourced project [S14] (A). LiteLLM: stolen publishing credentials, a malicious release live for under five hours [S20] (B), visible as a version gap on PyPI [S22] (A). |
| **Breaking-change cadence** | Measures the cost of staying, not just the odds of survival. | LangGraph: 1.0 on 2025-10-17, no 2.0 in ~12 months [S22] (A). | High-churn but alive: AI SDK majors every ~6 months [S23]; Pydantic AI 2.0 nine and a half months after 1.0 [S22] (A). |
| **Age (Lindy)** | Survivors have passed more tests [S21] (C, a heuristic). | Postgres, so pgvector's steady fixes [S35] (A). | — |
| **Standards-track status** | Slow but binding. | — | Not a death signal, a pace signal: OTel GenAI conventions are still "Development" in their own repo [S29] (A). |
| **Release silence** | A gap is a question, not a verdict. | — | `ragas` has had no PyPI release since 2026-01-13 [S22] (A); `smolagents` none since 2026-05-29 [S22] (A). Check the repo before calling either dead. |

GitHub stars appear nowhere above on purpose. They measure attention, not
production use. The signals here are about who can kill a project, whether
someone is maintaining it, and what staying on it costs.

### 3. Where new tech shows up first, ranked by signal-to-noise

The order is my judgement. The reasons are tied to sources where they exist.

1. **Spec repos and their changelogs.** These record what actually changed. The
   MCP 2026-07-28 changelog lists every breaking change with a proposal link
   [S26] (A). Nothing secondary is needed.
2. **Package registries.** Versions, dates, majors and yanks, per package, with
   a free RSS feed for each [S22][S23][S24] (A). These show churn and death
   before anyone writes about it. Example: the LiteLLM version gap [S22].
3. **Maintainer notices.** README banners, deprecation posts, roadmaps
   [S19][S28] (A). These are rare, decisive and dated. Bower's own maintainers
   told users to migrate years before the tool vanished from stacks [S16] (B).
4. **Practitioner radars with a track record.** Thoughtworks publishes reasons
   and isn't afraid to move a blip *backwards* (LLM as a judge: Trial → Assess)
   [S8] (B). That's slow, about twice a year, but it's a useful second opinion.
5. **Hands-on practitioner blogs.** These test tools and publish working code.
   Simon Willison himself says the best signal is in private group chats [S40]
   (C). For someone with no network, that's an argument for building one, not
   for reading more.
6. **Papers (arXiv).** Early for techniques, but the volume is high and the
   share relevant to freelance client work is small (I infer).
7. **Hacker News, X, launch posts.** Fastest, noisiest, and full of incentive
   bias.
8. **SEO "2026 guide" pages.** These are mostly noise with unsourced numbers.
   A search for model releases in September 2026 returned mostly these [S41]
   (C).

### 4. Evaluating fast: the spike protocol (2–8 hours)

Built from the signal table above. Run it only for items that pass the entry
bar in `radar.md`.

| Step | Time | Output |
|---|---|---|
| 0. Write the question | 10 min | One sentence: "Can X do Y for client type Z better than my current Adopt item?" plus a kill criterion. |
| 1. Desk check | 30–45 min | Governance (who can kill it?), maintainers, release cadence and majors from the registry, licence, open security advisories. Any red flag → Hold, stop. |
| 2. Hello-world on *my* problem | 1–2 h | Not the tutorial. Reproduce one slice of real work (a Primble field-fill, an ECOU extraction) in the new tool. |
| 3. Break it | 1–2 h | Failure modes: retries, timeouts, partial state, auth, cost per run, tracing. Run my eval set if one applies. |
| 4. Exit cost | 30 min | How much code would I rewrite to leave? Is the data portable? |
| 5. Verdict | 30 min | Add a 1-page note to `research/09-tech-radar/spikes/YYYY-MM-DD-<item>.md`: question, what I built, numbers, verdict (Adopt/Trial/Assess/Hold), what would change it. Update `radar.md`. |
| 6. Publish | 30 min | Turn the note into a post. This is the career step, not optional (§6). |

Hard rules: a timer, not a feeling. If step 1 takes more than 45 minutes,
the item isn't ready. At most one spike every two weeks, because the 15–20
spare hours have to serve distribution first, the bottleneck named in `profile.md`.

### 5. Snapshot, 2026-10-03

Full table with dates and reasons: `radar.md` (23 items: 7 Adopt, 5 Trial,
6 Assess, 5 Hold). Movements that matter most:

- **MCP grew up and broke things.** The 2026-07-28 spec removed the initialize
  handshake and protocol sessions, replaced server-initiated requests with
  Multi Round-Trip Requests, and moved Tasks to an extension [S26] (A). Roots,
  Sampling and Logging have a 12-month deprecation window [S27] (A). The Python
  SDK shipped 2.0.0 the same day [S22] (A). Building MCP servers is worth
  selling. Building on the old session model isn't.
- **Agent protocols consolidated under the Linux Foundation.** MCP, goose and
  AGENTS.md founded AAIF [S25] (A). A2A reached v1.0 in March 2026 [S30] (C)
  (SDK 1.0.0 on 2026-04-20 [S22], A).
- **Framework churn continues; Microsoft consolidated.** Agent Framework 1.0
  shipped 2026-04-02 and AutoGen went to maintenance mode [S22][S19] (A). OpenAI
  Agents SDK is still 0.x [S22] (A).
- **Observability is consolidating into data platforms.** ClickHouse bought
  Langfuse [S32] (A). The OTel GenAI conventions are still not Stable [S29] (A).
- **Coding agents are widely used but not trusted.** 84% use AI tools, while 46%
  distrust their accuracy [S36] (B). Thoughtworks Vol. 34's themes include
  "putting coding agents on a leash" [S4] (B), and Stack Overflow's 2026
  write-up describes agent use at work as mostly monitored [S39] (B).

### 6. Turning early into career value

- **Visible credentials pay; invisible work doesn't.** In Apache, contribution
  volume didn't predict wages but merit-based rank did, by 13–27% [S42] (A).
  For this profile, which hides finished work (`profile.md`), I infer the cheap
  move: publish every spike verdict and radar update.
- **Contribute where governance invites it.** MCP has a contributor ladder,
  working groups and an open proposal process [S28] (A). A merged SDK fix or
  conformance test is a public, merit-ranked credential, the kind [S42] found
  pays.
- **Build sellable units on Adopt items, not Assess items.** Clients pay for
  outcomes. "An MCP server over your SAP/Salesforce data, with an eval gate" is
  a productised offer built on durable parts (I infer; demand isn't tested here,
  that's track 07).

## Where sources disagree

- **Is MCP Adopt or Trial?** Thoughtworks held it at Trial (Nov 2025) [S6].
  Since then it gained neutral governance [S25], a deprecation policy [S28]
  and Tier 1 SDKs on a new spec [S27]. But that same spec broke wire
  compatibility [S26]. My Adopt is for *building servers on 2026-07-28*, not
  for the protocol's stability in general. Settled by: Thoughtworks Vol. 35's
  placement, and whether a 2027 spec breaks things again.
- **Are coding agents a speed-up?** The 2025 RCT found a 19% slowdown [S37].
  METR's 2026 attempt couldn't measure it cleanly, because developers refused
  to work without AI. METR thinks the speed-up is likely higher now but calls
  its evidence "very weak" [S38]. Self-reports run high and are known to be
  inflated [S37]. Settled by: a new RCT with a design that survives the
  selection effect. Until then, measure my own cycle time.
- **LLM-as-judge: gate or trap?** I run it as a release gate (Onlycouplez).
  Thoughtworks moved it back to Assess over bias [S8]. Both can be true: a judge
  calibrated against a human-labelled set is a gate, an uncalibrated one is a
  trap. Settled by: measuring judge–human agreement on my own data.
- **Corporate backing: a durability signal or not?** Backing kept many
  projects alive. It also ended AngularJS, plugins, Assistants and AutoGen
  [S15][S17][S18][S19]. My reading: backing predicts maintenance, not a stable
  API surface. That's inference from cases, not a measured base rate.

## Myths and hype to ignore

- **"Stars mean adoption."** Stars measure attention. None of the signals that
  predicted outcomes in §2 involves stars.
- **"Big backer means safe."** See §2: four AI-era and web-era deaths, all at
  the hands of their backers.
- **"Fastest benchmark wins."** Swarm won a benchmark that Docker
  commissioned [S12], and Kubernetes won the market. Vendor benchmarks are C
  evidence.
- **"Self-reported adoption counts."** "97M monthly SDK downloads" [S25] and
  "150 organizations" [S30] are self-reported by the projects' own backers.
  Useful for direction, not size.
- **"Hype cycle" charts as evidence.** They are a framing, not data. None is
  used here.
- **"Learn every new agent framework."** Five major agent frameworks shipped
  majors or entered maintenance in 12 months [S19][S22][S23]. The transferable
  skills (context, evals, durable state, protocols) outlast any of them.

## What to do

| Practice | How to do it | Cadence | How to measure it | Evidence grade |
|---|---|---|---|---|
| **Weekly scan, ≤ 90 min** | (1) 15 min: PyPI/npm/GitHub release feeds for every Adopt/Trial item [S24], scanning for majors, yanks and deprecations. (2) 10 min: spec and governance blogs (MCP blog, AAIF, OTel semconv-genai). (3) 15 min: two practitioner sources, no more. (4) 15 min: triage; anything new goes as one line into the `radar.md` candidates inbox, with its source. (5) 25 min: write one public post on one thing seen. (6) 5 min: decide whether a spike is earned. | Weekly, fixed slot (e.g. Sunday) | Scan ≤ 90 min (timer); 1 post per week; inbox lines have sources | A (registries), B (method) |
| **Spike protocol** | §4: question, desk check, real-problem build, break it, exit cost, verdict note, publish. | ≤ 1 per 2 weeks | Spikes finished within budget; each ends in a verdict + post | B (method), inference |
| **Quarterly radar update** | Re-pull registry data, move rings, add to the movement log, never rewrite. Delete items stuck in Assess for 3 quarters. | Quarterly (next: 2027-01) | Movement-log rows; items moved with a cited reason | A/B |
| **Pin and audit AI deps** | Lockfiles with hashes (`uv`/`pip --require-hashes`, `npm ci`); review MCP servers' transitive deps; no `latest`. | Every project | Zero unpinned deps in client repos | A/B [S20][S22] |
| **Ship one MCP server on the 2026-07-28 spec** | Over a system I know (Salesforce or a Postgres ledger), stateless, with an eval gate; publish repo + write-up. | Next 4–6 weeks | Public repo, post, one client conversation that references it | A [S26][S27] |
| **Calibrate judges** | Label 50–100 outputs by hand; report judge–human agreement next to every judge gate. | Per eval suite | Agreement rate recorded; gates below threshold get human review | B [S8] |
| **One upstream contribution** | A docs fix, test or conformance case in the MCP Python/TS SDK or LangGraph. | One per quarter | Merged PR link | A [S28], A [S42] |

## Leading indicators

- **Thoughtworks Vol. 35** (likely ~Nov 2026; I infer this from cadence): MCP
  to Adopt, or LLM-as-judge moved again.
- **OTel GenAI conventions reaching Stable** [S29]. That would move item 8 to Adopt.
- **A 2027 MCP spec that breaks compatibility again.** That would pull item 3 back
  to Trial.
- **LangGraph 2.0 with breaking changes.** That would raise migration cost and
  weaken item 4.
- **A2A showing up in real client RFPs or job posts** (track 07 data). That
  would move item 13 to Trial.
- **A second AI-package supply-chain compromise.** That would make dependency
  auditing a sellable service, not just hygiene.
- **A clean RCT on coding-agent productivity** [S38]. That would settle item 5's
  leash width.

## Questions for me

1. Which **two** of the seven Adopt items would I put on my portfolio page as
   the offer, given that no one sees the portfolio today?
2. Will I publish the spike verdicts under my own name? If not, what exactly
   is the fear, given the 13–27% visibility premium [S42]?
3. Which 90-minute weekly slot comes out of the 20 hours of YouTube and
   Instagram, not out of the 15–20 work hours?
4. Is "MCP server over your SAP/Salesforce data" a real buyer need or my
   assumption? Who are three people I could ask this month?
5. Onlycouplez uses LLM-as-judge gates. What is its judge–human agreement
   today? If I don't know, is the gate real?
6. Do any of my client codebases still call the Assistants API (sunset
   2026-08-26), or ship unpinned AI dependencies?
7. Which framework am I most tempted to learn next, and does it pass the desk
   check in §4, or is it entertainment?
8. Am I willing to make one upstream contribution per quarter to MCP or
   LangGraph as a credential, even though it pays nothing directly?
