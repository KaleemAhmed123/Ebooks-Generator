# 02. GraphRAG Foundations: Knowledge Graphs over Vector Chunks

## The Graph Paradigm

```mermaid
graph TD
    subgraph 2024 Vector RAG (Silos)
        A[Doc 1 Chunk] 
        B[Doc 2 Chunk]
        C[Doc 3 Chunk]
        A -.->|No relation| B
        B -.->|No relation| C
    end
    
    subgraph 2026 GraphRAG (Connected)
        D((Entity: Q1 Revenue))
        E((Entity: Supply Chain Risk))
        F((Entity: Q4 Revenue))
        G((Entity: Supplier XYZ))
        
        D -->|Impacted by| E
        E -->|Caused by| G
        F -->|Impacted by| E
    end
    
    A -.->|Evolution| D
```

## The Problem: The "Big Picture" Failure

As RAG entered widespread enterprise use, a critical limitation became obvious. If a user asked a simple, pointed question ("What is the termination clause in the standard SLA?"), vector RAG worked perfectly. 

But if a user asked a **Big Picture** or **Multi-Hop** question ("What are the common supply chain risks mentioned across the past three years of quarterly reports, and which suppliers are the root causes?"), vector RAG failed entirely.

Vector databases return isolated "chunks" based on semantic similarity. They cannot reason across documents. The database might return the three paragraphs that sound most like "supply chain risks," but it will miss the paragraph that actually names the supplier (because it didn't explicitly use the search terms). The chunks are disconnected silos.

## The Solution: GraphRAG

By late 2026, **GraphRAG** (Graph Retrieval-Augmented Generation) matured into a production standard to solve this. Instead of merely storing raw text chunks in a vector database, GraphRAG uses LLMs during the *indexing* phase.

1.  **Extraction**: The LLM reads the document and extracts Entities (Nodes) and Relationships (Edges).
2.  **Graph Construction**: It builds a massive, interconnected Knowledge Graph (e.g., Neo4j, Nebula).
3.  **Multi-Hop Traversal**: When queried, the system doesn't search for text similarity. It enters the graph at a specific entity node, and traverses the edges to find connected entities across hundreds of different documents.

This allows the AI to synthesize global answers, understand complex dependencies, and provide deeply explainable reasoning chains.

## Implementation: Building a GraphRAG Pipeline

Let's look at how to ingest data into a Knowledge Graph and query it across our languages using modern 2026 SDKs.

### Python: Ingestion and Entity Extraction

In Python, the focus is often on the data pipeline—extracting the entities and pushing them into a graph database.

```python
# Simulated 2026 GraphRAG SDK
from graphrag_sdk import GraphIndexer, KnowledgeGraphDB
from gpt6_sdk import AstraClient

def ingest_to_graphrag(documents: list[str]):
    # 1. Initialize the LLM specifically for high-accuracy extraction
    llm = AstraClient(model="gpt-6-astra", temperature=0.0)
    
    # 2. Connect to the underlying Graph Database (e.g., Neo4j 2026 edition)
    db = KnowledgeGraphDB(uri="bolt://localhost:7687", auth=("user", "pass"))
    
    # 3. Initialize the Graph Indexer
    indexer = GraphIndexer(llm=llm, db=db)
    
    print(f"[GraphRAG] Starting ingestion of {len(documents)} documents...")
    
    for i, doc in enumerate(documents):
        # 4. The LLM reads the document and extracts a structured list of:
        # - Entities (e.g., "Supplier_ABC", "Microchip_Shortage")
        # - Relationships (e.g., "Supplier_ABC" -> [CAUSES] -> "Microchip_Shortage")
        graph_triplets = indexer.extract_triplets(
            text=doc, 
            allowed_node_types=["Company", "Risk", "Product", "FinancialMetric"]
        )
        
        # 5. Upsert the triplets into the global graph
        # This automatically merges duplicate entities across different documents,
        # creating the "connected" nature of the graph.
        db.upsert_triplets(graph_triplets)
        print(f" -> Document {i} indexed. Extracted {len(graph_triplets)} relationships.")
        
    print("[GraphRAG] Ingestion complete. Knowledge graph is ready.")

# Example usage
docs = [
    "In Q1, revenue dropped due to a microchip shortage caused by Supplier ABC.",
    "Supplier ABC recently filed for bankruptcy in Q3.",
    "Product X relies heavily on Microchips."
]
ingest_to_graphrag(docs)
```

### TypeScript: Multi-Hop Graph Querying

From the application side (TypeScript), we query the graph. We don't use cosine similarity; we execute Cypher-like graph traversals augmented by LLM reasoning.

```typescript
// Simulated 2026 GraphRAG SDK
import { GraphRAGClient } from '@graphrag/sdk';
import { ClaudeClient } from '@anthropic/native-sdk';

async function queryGraphRAG() {
    // 1. Initialize the Graph connection and the LLM
    const db = new GraphRAGClient({ endpoint: 'http://localhost:7687' });
    const llm = new ClaudeClient({ model: 'claude-opus-5.5' });
    
    const userQuery = "If Supplier ABC goes bankrupt, which products are at risk?";
    console.log(`[Query]: ${userQuery}`);
    
    // 2. Identify the entry point entity from the user's query
    // The LLM extracts "Supplier ABC" as the root node for our search.
    const rootEntities = await llm.extractEntities(userQuery);
    
    // 3. Traverse the graph (Multi-Hop)
    // We tell the graph database to start at "Supplier ABC", and traverse outward 
    // up to 3 hops, bringing back the sub-graph of connected entities.
    const subGraphContext = await db.traverse({
        startNodes: rootEntities,
        maxHops: 3
    });
    
    // subGraphContext might look like:
    // Supplier ABC --[files]--> Bankruptcy
    // Supplier ABC --[causes]--> Microchip Shortage
    // Microchip Shortage --[impacts]--> Product X
    
    // 4. Generate the final answer using the graph context
    // The LLM can easily "connect the dots" now because the context is relational.
    const finalAnswer = await llm.completeText(`
        Answer the user query using the following Knowledge Graph relationships:
        ${subGraphContext.asTextString()}
        
        Query: ${userQuery}
    `);
    
    console.log(`[Answer]: ${finalAnswer}`);
}

queryGraphRAG().catch(console.error);
```

### Rust: High-Performance Graph Algorithms

In Rust, AI Engineers often run complex graph algorithms (like PageRank or Community Detection) *before* passing context to the LLM. This is used for global summarization tasks.

```rust
use graphrag_rs::{GraphDB, GraphAlgorithms};
use gpt6_sdk::AstraClient;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let db = GraphDB::connect("bolt://localhost:7687").await?;
    let llm = AstraClient::new("gpt-6-astra");
    
    println!("[GraphRAG] Running global analysis...");
    
    // 1. Community Detection
    // Run the Leiden algorithm to group the thousands of entities into hierarchical "communities" or topics.
    let communities = db.algorithms().run_leiden_community_detection().await?;
    
    // 2. We want a summary of the largest risk community
    let largest_community = communities.get_largest();
    
    // 3. Extract the core sub-graph of that specific community
    let community_graph = db.extract_subgraph(largest_community.node_ids).await?;
    
    // 4. Generate a global summary
    // Vector RAG cannot do this because it has no concept of "communities" across documents.
    let prompt = format!(
        "Summarize the core theme of this connected entity cluster:\n{}",
        community_graph.to_string()
    );
    
    let summary = llm.generate_answer(&prompt, "").await?;
    println!("[Global Summary]: {}", summary);
    
    Ok(())
}
```

### Julia: Scientific Graph Synthesis

For scientific literature, Julia is used to construct graphs where nodes are mathematical formulas, theorems, and experimental results, allowing researchers to trace the lineage of ideas.

```julia
using GraphRAG
using AI21SDK

function trace_theorem_lineage(theorem_name::String)
    # Connect to the scientific Knowledge Graph
    db = connect_graph("academic_graph_db")
    client = JambaClient(model="jamba-2-mini")
    
    # 1. Find the target theorem node
    theorem_node = find_node(db, type="Theorem", name=theorem_name)
    
    # 2. Graph Traversal: Follow "CITES" and "PROVES" relationships backwards
    # This retrieves all preceding papers and theorems that lead to this discovery.
    lineage_graph = traverse(db, start=theorem_node, edge_types=["CITES", "DERIVED_FROM"], direction="IN", hops=4)
    
    # 3. Convert the graph paths to a text representation for the LLM
    context = graph_to_text(lineage_graph)
    
    # 4. Generate the lineage report
    prompt = """
    Based on the following citation graph, write a chronological history of the mathematical 
    discoveries that led to $(theorem_name).
    
    Graph Context:
    $context
    """
    
    report = generate(client, prompt)
    println("[Research Agent] Lineage Report Generated:\n\n", report.text)
end

trace_theorem_lineage("Theorem of Neural Tangent Kernels")
```
