# AI Engineering: From Scratch

## RAG (Retrieval-Augmented Generation)

An LLM knows everything on the public internet up to its training cutoff. It knows absolutely nothing about your company's proprietary database or yesterday's meeting notes. 

### The Illusion of Fine-Tuning

Many beginners assume the fix is to fine-tune the model on their internal documents. This is a mistake. Fine-tuning is for teaching a model *how* to talk (tone, format), not *what* to know. It is expensive, hard to update, and causes hallucinations.

### The RAG Pipeline

**Retrieval-Augmented Generation (RAG)** solves this by stuffing the relevant facts into the prompt at runtime.
1. **Chunk & Embed:** Split your internal documents into 512-token chunks. Pass them through an embedding model (like `text-embedding-3-small`) to get dense vectors. Store them in a Vector Database.
2. **Retrieve:** When a user asks a question, embed the query. Perform a Cosine Similarity search in the Vector DB to find the top 5 most relevant chunks.
3. **Augment & Generate:** Paste those 5 chunks into the LLM's system prompt. Tell the model: *"Answer the user's question using ONLY the provided context."*

RAG provides cheap, instantly updatable, hallucination-resistant answers with perfect source attribution.
