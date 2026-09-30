# Glossary

**Actor-critic** — an RL method pairing a policy (actor) that chooses actions with a value estimate (critic) that judges them, training the actor on the advantage.

**Advantage** — how much better an action was than the expected value from that state; positive means it beat the average.

**ANN (approximate nearest neighbour)** — finding the closest vectors to a query without checking every one, trading a little accuracy for large speed gains.

**Autoregressive** — generating a sequence one piece at a time, each piece conditioned on all the pieces before it.

**AWQ (Activation-aware Weight Quantization)** — a 4-bit method that protects the small fraction of weights activations mark as important; fast on GPU serving.

**Base model** — the raw output of pretraining: a next-token predictor that continues text but does not yet follow instructions.

**Beam search** — decoding that keeps the top-b partial sequences at each step and returns the highest-probability full sequence; suited to closed tasks like translation, poor for open-ended text.

**Bellman equation** — value written in terms of itself one step ahead: reward now plus discounted value of the next state.

**Bi-encoder** — an embedding model that encodes query and document separately for fast comparison; contrast cross-encoder.

**BM25** — a classic keyword ranking function scoring a document by how often the query's rare terms appear in it; a sparse retrieval method.

**Bradley-Terry model** — the statistical model behind reward training: fit scores so a preferred item outranks a rejected one.

**Chain-of-thought (CoT)** — prompting the model to write intermediate reasoning steps before its answer, raising accuracy on hard tasks.

**Constitutional AI (CAI)** — aligning a model against written principles it uses to critique and revise its own answers, generating preference data without human labellers.

**Constrained decoding** — restricting the tokens the model may emit at each step so the output always matches a required grammar or schema.

**Context engineering** — deciding what goes into the context window, in what order and at what cost, to get the best answer per token.

**Continuous batching** — merging many users' requests into one rolling batch at the token level so the GPU is never idle.

**Credit assignment** — the RL problem of deciding which earlier actions deserve credit for a reward that arrives much later.

**Cross-encoder** — a model that reads a query and document together and outputs one relevance score; accurate but slow, used for re-ranking.

**Data / tensor / pipeline parallel** — three ways to split training across GPUs: copy the model and split the batch; split one layer's matrices; put different layers on different GPUs.

**Decode** — the generation phase that emits one token per forward pass; limited by memory bandwidth.

**Discount (γ)** — a factor between 0 and 1 that shrinks the value of future rewards so sooner is worth more than later.

**Discriminative model** — a model that learns the boundary between classes, `P(label | input)`; contrast generative.

**DPO (direct preference optimization)** — aligning a model on preference pairs with one supervised-style loss, skipping the reward model and RL loop.

**DQN (deep Q-network)** — a neural network estimating Q-values, stabilised by a replay buffer and a target network; learns discrete-action tasks from raw input.

**Dynamic programming** — solving a known MDP exactly by repeatedly applying the Bellman equation to every state.

**ε-greedy** — an exploration rule: act greedily most of the time, but pick a random action with probability ε.

**Few-shot** — putting a handful of worked examples in the prompt so the model infers the pattern; zero-shot uses none.

**FP8** — an 8-bit floating-point format native to recent GPUs, giving better accuracy than INT8 at similar size.

**FSDP / ZeRO** — techniques that shard weights, gradients, and optimizer state across data-parallel GPUs so no single GPU holds a full copy.

**GGUF** — a model file format (from llama.cpp) whose block-wise quantization runs well on CPUs and consumer machines.

**GPTQ** — a 4-bit quantization method that minimises layer-wise rounding error using curvature information; GPU-focused.

**GRPO (group relative policy optimization)** — a PPO variant that drops the critic, scoring each answer against the average of a sampled group; trained DeepSeek-R1.

**Guardrails** — checks around a model that screen inputs and outputs for unsafe, off-topic, or ungrounded content.

**HNSW** — a layered-graph ANN index that navigates to nearest neighbours in roughly logarithmic hops.

**HyDE (Hypothetical Document Embeddings)** — retrieving by embedding an LLM-drafted hypothetical answer instead of the raw question.

**Hybrid search** — combining dense (vector) and sparse (keyword) retrieval and fusing the two ranked lists.

**In-context learning** — a model learning a task from examples in the prompt, with no change to its weights.

**IPO (Identity Preference Optimization)** — a DPO variant adding regularisation to avoid over-fitting deterministic preferences.

**KTO (Kahneman-Tversky Optimization)** — preference alignment from single answers tagged desirable or undesirable, needing no pairs.

**KL penalty** — a term that subtracts reward when the policy drifts too far from a trusted reference model; the RLHF safety leash.

**LoRA (low-rank adaptation)** — fine-tuning by freezing the base weights and training two small low-rank matrices beside each large one.

**Lost in the middle** — the tendency of models to recall information at the start and end of a long context better than the middle.

**MDP (Markov decision process)** — the formal RL problem: states, actions, transitions, rewards, and a discount factor.

**Markov property** — the assumption that the next state depends only on the current state and action, not the full history.

**Model routing** — sending each request to the cheapest model able to handle it, escalating hard ones to a larger model.

**Monte-Carlo methods** — estimating value by playing full episodes and averaging the returns that actually followed.

**Nucleus sampling (top-p)** — sampling from the smallest set of tokens whose probabilities sum to p.

**ORPO (Odds Ratio Preference Optimization)** — preference alignment with no reference model, folded into the SFT stage.

**PagedAttention** — vLLM's technique storing the KV cache in fixed pages like OS virtual memory, ending cache fragmentation.

**PEFT (parameter-efficient fine-tuning)** — fine-tuning that trains a small number of new parameters and freezes the rest.

**Perplexity** — a measure of language-model loss: roughly how many tokens the model is choosing between at each step; lower is better.

**Policy (π)** — the agent's behaviour: the probability of each action given the state; what you deploy.

**Policy gradient** — an RL method that adjusts a policy's parameters directly to make high-return actions more likely.

**PPO (proximal policy optimization)** — a stable policy-gradient algorithm that clips how far each update can move the policy; the RLHF workhorse.

**Prefill** — the generation phase that processes the whole prompt in one parallel pass; compute-bound.

**Preference pair** — a prompt with two answers, one marked chosen and one rejected, used to train alignment.

**Prompt caching** — reusing the computed KV cache of a fixed prompt prefix across requests at a large discount.

**Prompt injection** — an attack where untrusted text carries instructions the model obeys, overriding the developer's.

**QLoRA** — LoRA fine-tuning on a base model stored in 4-bit, letting large models be tuned on a single GPU.

**Quantization** — storing model weights in fewer bits to shrink the model and speed inference, at some quality cost.

**Query rewriting** — transforming a user's query (clarify, decompose, expand) before retrieval to improve results.

**RadixAttention** — SGLang's technique caching the KV of shared prefixes in a tree so common context is computed once.

**RAG (retrieval-augmented generation)** — fetching relevant documents and putting them in the prompt so the model answers from real text.

**RAGAS** — a framework that scores RAG quality, including faithfulness and answer relevance, often via LLM-as-a-judge.

**Re-ranking** — a second, accurate pass (usually a cross-encoder) that reorders retrieved candidates and keeps the best few.

**REINFORCE** — the simplest policy-gradient algorithm, weighting each action's update by the raw return that followed.

**Reward hacking** — a policy exploiting flaws in the reward signal to score well without doing what was intended.

**Reward model (RM)** — a model trained on human preference pairs to predict a reward, supplying RL with a signal.

**RLAIF (RL from AI feedback)** — replacing the human preference labeller with an LLM judging answers against rules.

**RLHF (RL from human feedback)** — aligning a model in three stages: SFT, a reward model from human preferences, then PPO.

**RLVR (RL from verifiable rewards)** — RL where correctness is cheap to check (math, code), used to train reasoning models.

**RRF (reciprocal rank fusion)** — merging ranked lists using only ranks, `Σ 1/(k+rank)`, needing no score calibration.

**SARSA** — an on-policy TD control method that updates Q using the action actually taken next; contrast Q-learning.

**Serving engine** — software that wraps a model in an API, handling batching, KV-cache management, and token streaming (vLLM, SGLang, TensorRT-LLM).

**SFT (supervised fine-tuning)** — training a base model on instruction→response examples so it follows instructions.

**SimPO** — a reference-free DPO variant that length-normalises reward and enforces a target margin.

**Temperature** — a decoding knob dividing logits before softmax: below 1 sharpens, above 1 flattens, 0 is greedy.

**Top-k** — decoding that samples only from the k highest-probability tokens.

**Value / Q-value** — expected total discounted reward from a state (V), or from a state after a specific action (Q).

**Vector database** — a store that indexes embeddings and answers nearest-neighbour queries (Pinecone, Weaviate, Qdrant, Milvus, pgvector).
