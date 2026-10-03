## LlamaIndex: the data framework

- **LlamaIndex** started as *the* framework for RAG (Booklet 4) — connecting LLMs to your data — and grew agent capabilities on top. Its distinguishing strength is **data**: if your agent's core job is answering over documents, LlamaIndex's retrieval machinery is its reason to exist.

<svg viewBox="0 0 360 92" role="img" aria-label="LlamaIndex ingests data into indexes, retrieves relevant chunks, and an agent reasons over them with tools" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="34" width="60" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="40" y="46" text-anchor="middle" font-size="6">your docs</text><text x="40" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">PDF/DB/web</text>
  <rect x="90" y="34" width="60" height="24" rx="3" fill="#a03050"/><text x="120" y="46" text-anchor="middle" fill="#fff" font-size="6">index</text><text x="120" y="55" text-anchor="middle" fill="#fc8" font-size="5.5">embed+store</text>
  <rect x="170" y="34" width="70" height="24" rx="3" fill="#6a9bd0"/><text x="205" y="46" text-anchor="middle" fill="#fff" font-size="6">retrieve</text><text x="205" y="55" text-anchor="middle" fill="#eef" font-size="5.5">top-k chunks</text>
  <rect x="260" y="32" width="90" height="28" rx="4" fill="#24405e"/><text x="305" y="46" text-anchor="middle" fill="#fff" font-size="6.5">agent + tools</text><text x="305" y="55" text-anchor="middle" fill="#cdd" font-size="5.5">reason & answer</text>
  <path d="M70 46 L88 46" stroke="#888" marker-end="url(#li)"/><path d="M150 46 L168 46" stroke="#888" marker-end="url(#li)"/><path d="M240 46 L258 46" stroke="#888" marker-end="url(#li)"/>
  <defs><marker id="li" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **What it brings that agent-first frameworks lack:** a mature data pipeline — **connectors** to hundreds of sources (PDFs, Notion, Slack, databases, APIs), **indexing** (chunking, embedding, storing), and **retrieval** (vector, keyword, hybrid, with re-ranking). All the RAG engineering of Booklet 4 is packaged and battle-tested here.
- **The evolution:** LlamaIndex realized that great RAG plus tool use plus a loop *is* an agent — one that can decide *when* to retrieve, *what* to retrieve, and how to combine sources. So it layered an agent framework on its data foundation, making it the natural choice for **data-heavy** or **RAG-centric** agents.
- The mental model: **other frameworks are agent-first and add data; LlamaIndex is data-first and adds agents.** For a knowledge assistant over a large corpus, that origin shows in the polish of its retrieval.

:::note
The distinction to hold across this cluster: pick a framework by where its *center of gravity* is. LangGraph's is control flow; AutoGen/CrewAI's is multi-agent collaboration; LlamaIndex's is **data and retrieval**. If your agent lives or dies on retrieving the right information from a big, messy corpus — a documentation assistant, a research tool, an enterprise knowledge bot — LlamaIndex's data machinery is a real advantage over bolting RAG onto an agent-first framework.
:::
