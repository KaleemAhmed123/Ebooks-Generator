## Glossary

**A2A (Agent2Agent)** — Open protocol for agents built by different teams to discover and delegate tasks to each other, via Agent Cards.

**ACL (Agent Communication Language)** — FIPA standard where each message carries a performative (its intent) alongside its content.

**ACO (Ant Colony Optimization)** — Swarm algorithm where agents reinforce good paths with virtual pheromone, so better routes accumulate more use.

**action constitution** — Explicit natural-language principles governing what an agent may and may not do, checked before consequential actions.

**action expert** — A small continuous-action generator (flow-matching or diffusion) replacing a VLA's binned action head to produce smooth, dexterous motion (π0).

**action tokenization** — Discretising continuous robot controls into bins so a model predicts the next action token like a word (used by VLAs).

**actor model** — Concurrency design of isolated units that communicate only by asynchronous messages, with no shared memory; AutoGen's basis.

**Agent Card** — JSON document at a known URL advertising an A2A agent's skills, endpoint, and auth.

**agentic RAG** — RAG where an agent decides whether, what, and from where to retrieve, and can retrieve multiple times across sources.

**AI Safety Levels (ASL)** — Anthropic's escalating capability tiers in its Responsible Scaling Policy, each requiring stronger safeguards.

**AI Scientist** — System (Sakana AI) automating the full research loop: hypothesis, code, experiment, analysis, and paper writing.

**AlphaEvolve** — DeepMind system pairing an LLM with evolutionary search and an automatic evaluator to discover improved algorithms.

**any-resolution** — Feeding a large image as full-resolution tiles so fine detail (small text, UI) survives instead of being crushed to a fixed square.

**AnyRes** — High-resolution VLM trick: cut a large image into encoder-sized tiles, encode each plus a downsized global view, and concatenate all tokens.

**async tasks (MCP)** — MCP feature where a long tool call returns a handle immediately and reports progress and result later.

**Audio Flamingo 3 (AF3)** — Audio-language model that reasons about sound (speech, music, non-speech), not just transcribes it.

**AutoGen** — Microsoft framework modelling multi-agent work as asynchronous conversations between actor agents.

**autonomy ladder** — Levels of agent independence from assist (suggest only) to fully autonomous (no human in loop).

**backpressure** — Slowing intake when downstream is saturated, to keep a system from overloading.

**barge-in** — Letting a user interrupt a voice agent mid-sentence.

**blackboard** — Shared workspace all agents read from and write to, coordinating through it instead of direct messages.

**BLIP-2** — VLM that bridges a frozen vision encoder and frozen LLM with a small trainable Q-Former.

**bounded self-improvement** — An improvement loop capped by an external verifier; the regime all shipping systems use.

**browser agent** — Computer-use agent specialised to the web: navigate, click, fill forms, extract data, via the DOM or screenshots.

**Byzantine fault tolerance (BFT)** — Reaching agreement despite participants that may lie or fail arbitrarily; needs ≥3f+1 members to tolerate f bad ones.

**canary** — A small watched slice of traffic that receives a change first, so a bad update fails on a fraction, not everyone.

**canary deployment** — Routing a small fraction of traffic to a new version first, widening only if metrics hold, else rolling back.

**capabilities (MCP)** — Features each side declares in the initialize handshake; both must support one before it is used.

**cascade (model routing)** — Trying a cheap model first and escalating to an expensive one only when its output fails a check.

**cascade failure** — One agent's error propagating through a multi-agent system until the collective agrees on the mistake.

**Chameleon** — Meta early-fusion model that tokenises images into a shared vocabulary with text for one next-token transformer.

**ChartQA** — Benchmark for reading and reasoning over chart images.

**checkpointer** — LangGraph component that persists graph state after each node, enabling resume, human-in-the-loop, and time travel.

**checkpointing** — Persisting workflow state at each step so a run can resume after a crash rather than restart.

**Claude Agent SDK** — Anthropic's batteries-included runtime (behind Claude Code) with loop, MCP, skills, subagents, permission modes, and context management.

**client (MCP)** — Connector inside a host, one per server, that speaks the MCP protocol.

**CLIP (Contrastive Language-Image Pre-training)** — Trains an image encoder and a text encoder into one shared space so matching image-text pairs are close; enables zero-shot classification.

**code interpreter** — A tool that lets an agent write and run code in a sandbox; one general tool covering a huge task space.

**codebook (visual)** — The fixed set of learned discrete entries a VQ tokenizer snaps each image patch to, turning an image into integer token IDs.

**coding agent** — An agent that edits code and runs commands; comes as terminal/CLI, IDE-integrated, or cloud/async shapes.

**ColPali** — Vision-native retrieval that embeds page images directly (many vectors per page, late interaction), skipping OCR.

**component eval** — Evaluating each individual piece of an agent (retriever, router, a tool) in isolation.

**computer-use agent** — Agent that operates software by reading screenshots and emitting UI actions (click, type, scroll).

**conditional edge** — A LangGraph edge that routes to different nodes based on the state, enabling loops and branching.

**confused deputy** — Attack where a privileged agent is tricked into misusing its own broad credentials on behalf of a low-privilege caller.

**consensus** — A procedure for a group of agents to agree on one result despite disagreement or bad actors.

**Constitutional AI (CAI)** — Aligning a model by having it critique and revise its outputs against written principles; for agents, governs behaviour.

**Contract Net Protocol** — Task allocation by bidding: a manager announces, agents bid, the best bid wins and executes.

**contrastive learning** — Training by comparison: pull matched pairs together and push mismatched pairs apart in embedding space.

**cost governor** — A hard, in-path budget (tokens, steps, time, dollars) that halts an agent before runaway spend.

**credit assignment** — Determining which agent's step caused a multi-agent system's failure.

**CrewAI** — Framework modelling agents as roles with goals, assigned tasks, run as a sequential or hierarchical crew.

**cross-modal retrieval** — Retrieving one modality with a query in another (text query returning an image, or vice versa).

**CTDE (centralized training, decentralized execution)** — MARL recipe: train with a global-view critic, act on local views at run time.

**dangerous-capability evaluation** — Tests measuring whether a model has abilities (cyber, bio, autonomy) that trigger safeguards.

**Darwin-Gödel Machine (DGM)** — Agent that rewrites its own code and keeps an archive of improved versions, tested empirically.

**deadlock** — Coordination failure where each agent waits for another, so none proceeds.

**debate (multi-agent)** — Agents arguing opposing positions over rounds, with a judge deciding; improves accuracy and enables scalable oversight.

**DocVQA** — Benchmark for question-answering over document images.

**DOM perception** — Perceiving a web page via its HTML structure (precise but brittle) versus by screenshot (vision).

**domain randomization** — Randomizing textures, lighting, and physics in simulation so a policy transfers to the real world (sim2real).

**DSPy** — Framework where you declare typed signatures and a compiler generates and optimises the prompts against a metric.

**durable execution** — Making a long workflow survive crashes: persisted state, resume from last step, idempotent side effects.

**dynamic resolution** — Feeding images at (near) native resolution so the visual token count varies with image size (Qwen-VL, Pixtral).

**early fusion** — Combining modalities at the input by putting them in one shared token vocabulary, enabling one model to read and generate both.

**elicitation (MCP)** — A server asking the user for input mid-task, mediated by the host.

**emergent communication** — MARL agents inventing their own signals to coordinate when given a channel but no predefined language.

**Emu3** — Early-fusion model that does understanding and generation of text, image, and video by pure next-token prediction over discrete tokens.

**error compounding** — The sharp drop in end-to-end success as step count rises, since per-step reliability multiplies.

**eval-driven development** — Putting a measurable test suite at the centre of building an agent, so every change is scored.

**evaluator (evolutionary)** — The automatic scorer that rates candidates in an evolutionary loop; its quality bounds the loop.

**evaluator-optimizer** — Workflow where a generator produces output, an evaluator critiques it, and the generator revises, looping.

**executable constraint** — A rule enforced by code, schema, or a tool gate rather than merely stated in the prompt.

**false success** — An agent reporting a task done when it silently failed; the most dangerous agent failure mode.

**FastMCP** — High-level MCP server API where a decorated function's type hints and docstring become the tool schema.

**FIPA** — 1990s standards body for agent communication; origin of ACL and performatives.

**Flamingo** — DeepMind VLM that keeps the LLM frozen and reads images via gated cross-attention layers.

**Flows (CrewAI)** — CrewAI's event-driven layer for deterministic orchestration that can invoke autonomous crews.

**Frontier Safety Framework (FSF)** — Google DeepMind's capability-gated safety framework with Critical Capability Levels.

**function calling** — Mechanism where a model returns a structured tool-use block naming a tool and arguments, which your code executes.

**fusion (multimodal)** — How a VLM joins vision and language: projector, query bottleneck, cross-attention, or shared tokens, from shallow to deep.

**GAIA** — Benchmark of general-assistant tasks requiring reasoning, tools, and web use.

**gated cross-attention** — Cross-attention added to a frozen model behind a tanh gate initialised to zero, so it starts contributing nothing.

**GenAI semantic conventions** — OpenTelemetry's agreed attribute names for LLM data (model, token counts, tool calls).

**generative agents** — LLM agents with memory, reflection, and planning placed in a simulated world to study emergent social behaviour.

**goal drift** — An agent losing sight of its original objective over a long run and wandering onto a wrong task.

**Gödel machine** — Schmidhuber's theoretical self-rewriting agent that changes itself only when it can prove the change helps.

**GR00T** — NVIDIA foundation model for humanoid robots, trained on human video, simulation, and teleoperation.

**grounding (visual)** — A VLM returning the location (bounding box or coordinates) of a described object, enabling GUI control.

**group chat** — Multi-agent conversation where several agents share one thread, governed by speaker selection.

**groupthink** — Agents converging on a wrong answer by deferring to one another instead of reasoning independently.

**guardrail** — A validation check on an agent's inputs or outputs that can halt or redirect it.

**guardrails** — Input/output checks that run alongside an agent to block unsafe or off-policy content or actions.

**handoff** — One agent transferring the whole conversation to another; peer-to-peer control transfer.

**hierarchical architecture** — Supervisors of supervisors; layered delegation that spreads coordination and context load.

**hierarchy (multi-agent)** — Nested supervisors coordinating sub-supervisors and workers, scaling coordination like an org chart.

**host (MCP)** — The AI application that runs the model and hosts one client per connected server.

**HTN (Hierarchical Task Network)** — Planning by decomposing a goal into sub-tasks down to primitive actions.

**hybrid memory** — Combining stores (vector, graph, context) for agent memory; mem0 is a common implementation.

**idempotency** — Designing an operation so running it twice has the same effect as once, making retries safe.

**InfoNCE** — The contrastive loss (symmetric cross-entropy over a similarity matrix) that trains CLIP; quality scales with the number of in-batch negatives.

**instrumental goals** — Sub-goals (acquiring resources, avoiding shutdown) useful for many objectives; a theorized autonomy risk.

**InternVL** — Open VLM family with a large vision encoder, strong on documents and charts.

**isolation** — Confining an agent so it physically cannot reach outside its granted scope.

**Janus / Janus-Pro** — DeepSeek models with decoupled encoders — separate visual pathways for understanding and generation, one shared body.

**JSON Schema** — Standard for describing the shape of JSON data; used to define tool input parameters.

**JSON-RPC** — Lightweight remote-procedure-call standard (request, response, notification) that MCP messages use.

**JSON-RPC 2.0** — Simple request/response format over JSON; MCP's message layer.

**judge (LLM-as-judge)** — A model scoring outputs against a rubric, used to pick the best candidate or grade evals.

**kill switch** — An external, always-reachable control that stops an agent and revokes its access immediately.

**kill-switch** — A control that halts agents immediately, reachable without the agent's cooperation.

**Langfuse** — Open-source, self-hostable, OTel-native agent observability platform (traces, prompts, evals, cost).

**LangGraph** — Framework modelling an agent as an explicit graph of nodes and edges over shared, checkpointable state.

**LangSmith** — LangChain's tracing, dataset, and evaluation platform for LLM apps and agents.

**late interaction** — Retrieval that keeps many vectors per item and matches a query against the most relevant one (ColBERT, ColPali).

**LATS (Language Agent Tree Search)** — Agent method running Monte Carlo Tree Search over action sequences with tool observations and reflections.

**least privilege** — Granting the narrowest access a task needs, enforced from outside the model.

**lethal trifecta** — The exploitable combination of private-data access, untrusted content, and external communication in one agent.

**livelock** — Agents acting continuously without progress (e.g. endlessly deferring to each other).

**Llama Guard** — Meta's open safety classifier that labels prompts and responses against a harm taxonomy.

**LlamaIndex** — Data/RAG-centred framework for connecting LLMs to documents, with agents built on top.

**LLaVA** — VLM that projects frozen CLIP patch tokens through an MLP into the LLM's token stream; the dominant open recipe.

**LLM-as-judge** — Using a model with a rubric to score outputs, making subjective quality measurable at scale.

**long-horizon** — A task running hundreds of steps or many hours, where error compounding dominates.

**long-horizon agent** — An agent working autonomously over many steps and a long time on one task.

**lost in the middle** — Models attending worse to information in the middle of a very long context.

**M-RoPE** — Multimodal rotary position embedding encoding position along time, height, and width separately (Qwen-VL).

**MADDPG** — Multi-agent actor-critic (CTDE) with per-agent actors and a centralized critic.

**MADDPG / QMIX / MAPPO** — Multi-agent RL algorithms for continuous control, cooperative value mixing, and multi-agent PPO respectively.

**map-reduce** — Splitting work across parallel workers (map) and combining their outputs (reduce); the swarm pattern.

**MAPPO** — Multi-agent PPO with a centralized value function; a strong, simple MARL baseline.

**MARL (multi-agent RL)** — Training several agents that learn while interacting, facing a non-stationary environment.

**MAST** — A taxonomy of multi-agent system failure modes, most of them coordination rather than reasoning failures.

**max_steps budget** — A cap on loop iterations that prevents an agent from running forever.

**MCP (Model Context Protocol)** — Open standard for how AI apps connect to tools and data, turning M×N integrations into M+N.

**mechanism design** — Engineering interaction rules so self-interested agents produce good collective outcomes (e.g. truthful bidding).

**mem0** — Open memory layer with fact extraction, new/update/conflict reconciliation, and hybrid vector+graph storage.

**MemGPT (Letta)** — System applying virtual-memory paging to LLMs; the agent manages its own context via memory tools.

**memory blocks** — Structured, rewritten memory units (persona, human, task) an agent maintains instead of a raw transcript.

**METR** — Independent evaluator of frontier models' autonomous capability; originator of the task-horizon metric.

**Mixture-of-Agents (MoA)** — Layered aggregation where agents answer, an aggregator synthesises, repeated to refine.

**MLP projector** — The small two-layer network that maps vision-encoder tokens into an LLM's embedding space in LLaVA.

**MMMU** — College-level multimodal reasoning benchmark spanning many subjects with diagrams and formulas.

**model collapse** — Quality degradation when a model is trained on its own unfiltered output.

**Model Context Protocol (MCP)** — Open standard connecting AI apps to tools/data via host, client, and server roles, turning M×N integrations into M+N.

**Molmo** — Open VLM from AI2 notable for fully open PixMo data and pointing (coordinate) capability.

**Monte Carlo Tree Search (MCTS)** — Search that balances exploration and exploitation over a tree; the engine of LATS and game AI.

**multi-agent debate** — Several agents answering, then critiquing each other across rounds to converge more accurately.

**multi-agent system (MAS)** — Several agents working together via division of labor, specialization, checking, or coordination.

**multi-session handoff** — Passing distilled state (goal, progress, next steps, gotchas) from one agent run to the next.

**multimodal model** — One model taking more than one input type (text with images, audio, or video) and reasoning across them.

**multimodal RAG** — Retrieval-augmented generation over a knowledge base of mixed modalities (text, images, tables, charts).

**NaViT (Native-resolution ViT)** — A ViT that ingests any resolution/aspect ratio directly via patch-n-pack, no tiling.

**negotiation** — Reaching agreement between agents with opposed goals, via offers and counter-offers.

**network topology** — Multi-agent shape where agents talk peer-to-peer with no central coordinator.

**node (LangGraph)** — A function that reads the shared state and returns an update; a step in the graph.

**non-stationarity** — In MARL, the moving-target problem that every agent's environment changes as all agents learn simultaneously.

**non-stationary** — In MARL, the environment appearing to change to one agent because the other agents keep adapting.

**OAuth 2.1** — The delegated-authorization profile MCP adopted for remote servers; issues scoped tokens.

**observability (agents)** — Capturing every model call, tool call, and decision of agent runs as traces for debugging, cost, and quality.

**OCR (optical character recognition)** — Extracting text from an image; modern document VLMs increasingly skip it and read pixels directly.

**omni model** — A model taking any input modality and producing any output modality, often in real time.

**OpenAI Agents SDK** — Minimal agent runtime built on agents, handoffs, and guardrails, with built-in tracing.

**OpenTelemetry (OTel)** — Vendor-neutral standard for traces, metrics, and logs; extended with GenAI conventions.

**OpenVLA / π0 / GR00T** — Named vision-language-action models for robot control (open backbone, Physical Intelligence, NVIDIA humanoids).

**orchestration** — Arranging multiple model calls or agents into a working system (pipeline, supervisor, parallel, network).

**orchestrator-workers** — Pattern where an LLM dynamically decomposes a task, delegates to workers, and synthesizes results.

**OSWorld** — Benchmark for agents operating a real desktop operating system.

**over-action** — An agent doing more than instructed (deleting extra, sending more) due to broad interpretation.

**parallel tool calls** — A model emitting multiple tool-use blocks in one turn, run concurrently.

**patch token** — One image patch, linearly embedded, treated as a token in a ViT's input sequence.

**patch-n-pack** — Training technique packing tokens from several different-sized images into one sequence, avoiding padding.

**Perceiver Resampler** — Module using a fixed set of learned latents to cross-attend to variable visual input and emit a fixed token count (Flamingo).

**performative** — The intent label on an ACL message (inform, request, propose) telling the receiver how to interpret it.

**permission mode** — A setting for how much an agent may do unsupervised (read-only, ask-each-action, accept-edits, full-auto).

**pheromone** — The shared trail ants leave in ACO; a form of stigmergy (coordination through the environment).

**Pipecat / LiveKit** — Frameworks handling real-time voice-agent orchestration (streaming, VAD, turn-taking, barge-in).

**Pixtral** — Mistral open VLM with a from-scratch native-resolution vision encoder (no CLIP).

**plan-and-execute** — Pattern splitting a planner (writes the full plan) from an executor (carries out steps).

**pointing (VLM)** — A VLM emitting pixel coordinates for an object or UI element, enabling action and grounding.

**POPE (Polling-based Object Probing Evaluation)** — Hallucination benchmark asking yes/no questions about present and absent objects.

**Preparedness Framework** — OpenAI's capability-gated risk framework across categories like cyber, CBRN, and autonomy.

**procedural memory** — Memory of how to do things: learned, reusable skills (e.g. Voyager's code skill library).

**progressive disclosure** — Loading skill detail in layers (name always, body when relevant, scripts when run) to save context.

**projector (VLM)** — A small learned network mapping vision-encoder features into the LLM's token embedding space (LLaVA's linear/MLP connector).

**prompt chaining** — Workflow decomposing a task into a fixed sequence of LLM calls, each on the previous output.

**prompt injection** — Untrusted text an agent reads that contains instructions it then obeys; the defining agent security risk.

**prompts (MCP)** — Reusable templates the user invokes deliberately, often as slash-commands; user-controlled.

**propose-then-commit** — Splitting a risky action into a proposal an agent makes and a commit a gate approves.

**PSO (Particle Swarm Optimization)** — Optimization where candidate solutions move toward their own and the swarm's best-found points.

**Q-Former** — BLIP-2's bridge: learned query vectors that compress image patch tokens into a few tokens for the LLM.

**QK-Norm** — Normalizing queries and keys before attention to stabilize training; key to early-fusion models like Chameleon.

**QMIX** — Cooperative MARL that combines per-agent Q-values into a monotonic team value.

**query engine (LlamaIndex)** — Object that answers questions over an index by retrieving relevant chunks and generating a grounded answer.

**Qwen-VL** — Alibaba VLM family with dynamic resolution and native grounding (returns coordinates), favoured for GUI agents.

**ReAct** — Reason+Act pattern: the model writes a thought, then an action, then reads the observation, repeating.

**recursive self-improvement (RSI)** — An agent improving its own ability to improve, potentially uncapped; theoretical, not demonstrated.

**red-teaming** — Adversarially attacking a model or agent to find the ceiling of harm before an attacker does.

**reducer (LangGraph)** — A function defining how a node's returned update merges into state (e.g. add_messages appends).

**reflection** — Distilling raw observations into higher-level insights; core to generative agents and long-term memory.

**Reflexion** — Learning from failure in words: after a failed attempt the model writes a self-reflection the retry reads.

**registry (MCP)** — A catalogue of MCP servers with metadata and versions; a discovery and supply-chain layer.

**replanning** — Handing control back to the planner when a step fails or surprises, instead of blindly continuing.

**reservation value** — A negotiating agent's walk-away point.

**resource indicators (RFC 8707)** — Binding OAuth tokens to a specific server so a stolen token cannot be replayed elsewhere.

**resources (MCP)** — Data the host application can load into context (files, records) by URI; app-controlled.

**reviewer agent** — A separate, fresh-context agent that critiques another agent's output.

**reward hacking** — Satisfying the letter of an instruction while violating its intent (e.g. deleting a failing test).

**ReWOO** — Plan-and-execute variant where all steps are planned up front referencing each other's outputs, minimising LLM calls.

**role specialization** — Splitting work into agents with distinct responsibilities, prompts, tools, and often models.

**rollback** — Returning to a known-good checkpoint after a bad step.

**roots (MCP)** — URI boundaries a client declares to confine a server's filesystem/resource access (least privilege).

**routine** — A focused agent defined by a specific set of instructions and tools for one job.

**routing (workflow)** — Classifying an input and dispatching it to a specialized handler.

**routing layer** — A layer that picks the model per request by task, cost, latency, or fallback; also a proxy for many providers.

**RSP (Responsible Scaling Policy)** — Framework tying required safeguards to measured model capability (Anthropic; ASL levels).

**RT-2** — Google's first internet-scale vision-language-action model (2023).

**rug pull** — An MCP server silently changing a tool's behavior after it was approved.

**rug-pull** — An MCP server shipping a clean tool description, getting approved, then swapping in a malicious one.

**Runner (OpenAI SDK)** — Component that runs the agent loop until a final output, enforcing max-turns.

**sampling (MCP)** — A server asking the client to run an LLM completion on its behalf, under the host's control.

**sandbox** — An enforced environment (container, VM) limiting what code can do regardless of permission logic.

**scope contract** — An explicit, enforced statement of what an agent may read, write, and call.

**sectioning** — Parallelization flavor that splits a task into independent sub-parts done concurrently.

**self-play** — An agent improving by training against copies of itself, creating an automatic difficulty curriculum.

**self-refine** — Producing an answer, critiquing it, and revising over a few rounds to raise quality.

**semantic memory** — Memory of general facts and knowledge, distilled from many episodes (e.g. 'the user prefers Python').

**server (MCP)** — A program exposing tools, resources, and prompts; knows nothing about the model.

**session (agent)** — Automatic conversation history across turns providing short-term memory.

**set-of-marks** — Overlaying numbered labels on UI/image elements so a VLM selects a number instead of predicting raw coordinates.

**Show-o** — Unified model mixing autoregressive text with discrete diffusion for images in one transformer.

**SigLIP** — CLIP variant using a pairwise sigmoid loss, training well without giant batches; a common VLM vision encoder.

**signature (DSPy)** — A typed declaration of a step's inputs and outputs, from which DSPy generates the prompt.

**sim2real gap** — The performance drop when a policy trained in simulation meets real-world physics, noise, and lighting.

**situational awareness** — A model behaving differently when it recognizes it is being tested or monitored.

**skill** — A packaged unit of capability (instructions plus optional scripts/resources) teaching an agent a whole task.

**sleep-time compute** — Doing expensive memory consolidation between interactions so live turns stay fast.

**smallest testable slice** — The smallest unit of work that produces a verifiable result; the unit to hand an agent.

**Society of Mind** — Minsky's view of intelligence as many simple interacting agents; motivates multi-agent debate.

**span** — A timed unit of work (a model or tool call) recorded in a trace.

**span / trace** — A span is one timed unit of work; nested spans form a trace of a whole request.

**speaker selection** — Deciding which agent speaks next in a group chat (round-robin, manager-selects, rule-based).

**spectrogram** — A time-frequency image of sound; audio-LMs patchify and encode it like an image.

**STaR (Self-Taught Reasoner)** — Self-improvement by generating reasoning, keeping only correct chains, and fine-tuning on them.

**stdio** — MCP's local transport: the server runs as a subprocess communicating over standard input/output.

**stigmergy** — Coordination through marks left in a shared environment rather than direct messaging.

**Store (LangGraph)** — Cross-thread key-value store (optionally with vector search) for long-term memory shared across conversations.

**Streamable HTTP** — MCP's remote transport (2025 revision) where the client POSTs JSON-RPC and the server may stream back.

**structured output** — Forcing a model's final answer into a fixed, validated JSON shape (no function runs).

**subagent** — A fresh-context helper an agent spawns for a sub-task, then discards.

**subgraph** — A LangGraph graph used as a node inside another graph, enabling composition and reuse.

**summarization memory** — Long-term memory that replaces old turns with a rolling summary; gist-preserving but lossy.

**supervisor (orchestrator)** — A lead agent that delegates sub-tasks to workers and integrates their results.

**supervisor pattern** — Multi-agent topology where one coordinator delegates to workers and synthesizes results (star topology).

**supply chain (MCP)** — The dependency risk of installing third-party servers (typosquatting, drift, unvetted publishers).

**swarm** — Many identical agents working on disjoint pieces in parallel with little coordination.

**swarm intelligence** — Collective problem-solving by many simple agents following local rules (PSO, ACO).

**SWE-bench** — Benchmark where an agent must patch a real repository so its hidden tests pass; the headline coding-agent metric.

**task horizon** — The length of task (in human time) a model can complete reliably; METR's autonomy metric.

**Temporal** — A durable-execution workflow engine that persists each step and replays to resume without repeating side effects.

**temporal grounding** — Identifying the timestamp in a video where a described event occurs.

**theory of mind (ToM)** — Modelling what other agents know, want, and will do; needed for good coordination.

**thinker-talker** — Omni-model split: a thinker reasons and produces text while a lightweight talker streams speech in parallel.

**thread (LangGraph)** — One conversation's persisted state, keyed by thread_id, giving short-term memory.

**time travel (LangGraph)** — Rewinding a checkpointed agent run to an earlier state, optionally editing it, and re-running.

**token pooling (visual)** — Merging neighboring patch tokens after encoding to cut visual token count by k² at the cost of spatial precision.

**tool** — A function the model is allowed to call; the line between a chatbot and an agent.

**tool choice** — Control over whether the model must call a tool: auto, any, a forced tool, or none.

**tool poisoning** — Hiding malicious instructions in a tool's description that the model reads and obeys.

**tool shadowing** — A malicious server registering a tool with the same name as a trusted one to intercept calls.

**tool_result** — The message block returning a tool's output to the model, keyed to the tool_use id.

**tool_use** — The message block in which a model requests a tool call, carrying an id, name, and input.

**trace** — A tree of spans for one end-to-end request; an agent run is a trace.

**trajectory eval** — Evaluating whether an agent took the right steps and tools, not just the final outcome.

**Transfusion** — Model running next-token prediction on text and a diffusion objective on image patches in one transformer.

**Tree of Thoughts (ToT)** — Reasoning as a searchable tree of candidate thoughts, scored and pruned.

**unified understand-and-generate** — Models aiming to both read and produce images well without a quality trade-off.

**VAD (voice activity detection)** — Detecting when a speaker starts and stops, for turn-taking in voice agents.

**verbal RL** — Reinforcement via language feedback (a written reflection) rather than weight updates; Reflexion's principle.

**verification gate** — A hard checkpoint a result must pass before an agent may proceed.

**Vickrey auction** — Second-price sealed-bid auction where bidding your true value is optimal.

**virtual context** — Faking an unbounded context by paging facts between the window and external storage (MemGPT).

**Vision Transformer (ViT)** — Encoder that splits an image into fixed patches, embeds each as a token, and runs a standard transformer; the eye in most VLMs.

**vision-language model (VLM)** — A model taking images and text in and producing text out.

**visual instruction tuning** — Training a VLM on (image, instruction, answer) data, often generated by prompting a text LLM with image annotations (LLaVA).

**VLA (vision-language-action model)** — A VLM that outputs robot actions instead of text, via action tokenization.

**VLM (vision-language model)** — A language model that also accepts images.

**voice agent** — An agent that listens and speaks in real time, wrapping an agent loop in a low-latency speech pipeline.

**Voyager** — Minecraft LLM agent that wrote, stored, and composed its own skills, improving without retraining.

**VQ tokenizer** — Vector-quantization autoencoder that maps image patches to discrete codebook indices, enabling early fusion.

**WebArena** — Benchmark for agents completing tasks on real websites.

**workbench** — Everything around the model — instructions, tools, context, feedback, scope — that determines whether it succeeds.

**workflow** — A system where you code the steps and the model fills blanks, as opposed to an agent choosing the steps.

**workflow engine** — Infrastructure (e.g. Temporal) providing durable execution and exactly-once side effects.

**Workflows (LlamaIndex)** — LlamaIndex's event-driven low-level orchestration framework.

**zero-shot classification** — Labeling an image by embedding candidate class names and picking the nearest, without training on those labels (CLIP).

**ZOPA (zone of possible agreement)** — The range of deals both negotiating parties prefer over no deal.
