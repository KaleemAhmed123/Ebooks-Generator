# 02. Self-Describing Requests & Stateless Agentic Discovery

## The Discovery Architecture

```mermaid
graph TD
    subgraph 2024 Stateful Discovery
        A[Client] <-->|Connects & Stays Open| B(MCP Server)
        A -->|Get Tools| B
        B -->|Tool List| A
        A -->|Execute Tool on same connection| B
    end
    
    subgraph 2026 Stateless Discovery (SOTA)
        C[Agent Client] -->|HTTP GET /server/discover| D[API Gateway / Server Pool]
        D -->|Returns Manifest + ETag| C
        C -->|Cache Manifest Locally| C
        C -->|HTTP POST /tools/call<br>Includes: ETag, Client Caps| D
        D -->|ETag Match: Execute!| C
        D -.->|ETag Mismatch: Tool Updated| E[HTTP 412: Precondition Failed]
        E -.->|Triggers Re-Discovery| C
    end
```

## The Problem: The Latency of Statelessness

The shift to a stateless Model Context Protocol (MCP) in July 2026 solved the fragility of long-horizon agents, but it introduced a new problem: **Discovery Latency**.

If an agent is completely stateless, how does it know what tools a remote MCP server provides? 

In the 2024 stateful model, the client connected once, asked for the list of tools, and then kept that connection open indefinitely. In the new stateless model, querying the server for its tool list *before every single execution request* would double the network round-trips, destroying latency and overloading the server.

## The Solution: Caching and Self-Describing Execution

To solve this, the 2026 MCP specification embraced standard web architecture concepts—specifically, HTTP caching (ETags) and Precondition validations.

1.  **Stateless Discovery Endpoint (`server/discover`)**: The client hits this endpoint once to download the capability manifest (the list of tools, resources, and prompts). The server returns this alongside a cryptographic hash (an ETag) representing that specific version of the manifest.
2.  **Client-Side Caching**: The agent caches the tools locally.
3.  **Self-Describing Execution**: When the agent wants to use a tool, it sends a stateless execution request that includes the cached ETag (using the `If-Match` header concept).
4.  **Graceful Invalidation**: If the server has updated its tools since the agent last checked, the ETags will not match. The server rejects the execution with a standard `412 Precondition Failed` error. The agent intercepts this error, autonomously calls the discovery endpoint to refresh its cache, and retries the execution.

This achieves zero-state on the server while eliminating redundant discovery calls.

## Implementation: Building Stateless Discovery

Let's look at how AI Engineers implement this caching and invalidation loop.

### Python: The Resilient Discovery Client

In Python, we build a client that manages its own cache and gracefully handles server-side tool updates without crashing the agent loop.

```python
import httpx
# Simulated 2026 Stateless MCP SDK
from mcp_stateless import MCPRequest, Capabilities

class StatelessDiscoveryClient:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.tool_cache = None
        self.manifest_etag = None
        
    async def discover_tools(self) -> dict:
        """Hits the stateless discovery endpoint and caches the result."""
        print("[Client] Executing /server/discover to fetch tool manifest...")
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{self.base_url}/server/discover")
            response.raise_for_status()
            
            # Cache the tools and the version tag (ETag)
            self.tool_cache = response.json().get("tools", [])
            self.manifest_etag = response.headers.get("ETag")
            
            print(f"[Client] Discovered {len(self.tool_cache)} tools. ETag: {self.manifest_etag}")
            return self.tool_cache

    async def execute_tool(self, tool_name: str, arguments: dict):
        """Executes a tool, automatically handling cache invalidations."""
        
        # 1. Ensure we have tools cached before executing
        if not self.tool_cache:
            await self.discover_tools()
            
        # 2. Build the Self-Describing Request
        request_payload = {
            "method": "tools/call",
            "params": {"name": tool_name, "arguments": arguments},
            "client_capabilities": {"supports_async": True}
        }
        
        async with httpx.AsyncClient() as client:
            # 3. Send the execution request, including the ETag
            # This tells the server: "Execute this, but ONLY IF your tools haven't changed since this ETag."
            response = await client.post(
                f"{self.base_url}/tools/call",
                json=request_payload,
                headers={"If-Match": self.manifest_etag} 
            )
            
            # 4. Handle Cache Invalidation (The Server's tools changed!)
            if response.status_code == 412: # Precondition Failed
                print("[Client] Server manifest updated! Cache invalidated. Re-discovering...")
                # Autonomously refresh the cache
                await self.discover_tools()
                # Recursively retry the execution with the new ETag
                return await self.execute_tool(tool_name, arguments)
                
            response.raise_for_status()
            return response.json()

# Example Usage
import asyncio

async def run_agent():
    mcp_client = StatelessDiscoveryClient("https://api.enterprise.internal/mcp")
    
    # First call will trigger discovery, then execute.
    result = await mcp_client.execute_tool("read_database", {"table": "users"})
    print("Result:", result)
    
    # Second call uses the cached tools, saving a network round trip!
    result2 = await mcp_client.execute_tool("read_database", {"table": "logs"})
    print("Result 2:", result2)

if __name__ == "__main__":
    asyncio.run(run_agent())
```

### TypeScript: The Stateless ETag Server

On the server side (TypeScript), we must implement the logic that checks the incoming ETag and rejects outdated requests. This ensures the agent never accidentally calls a tool with a deprecated schema.

```typescript
import express from 'express';
import crypto from 'crypto';

const app = express();
app.use(express.json());

// The server's current state of available tools.
// In a real app, this might be loaded from a database or config file.
const currentTools = [
    { name: "read_database", description: "Reads from a DB table", schema: { /*...*/ } },
    { name: "send_email", description: "Sends an email", schema: { /*...*/ } }
];

// Helper to generate an ETag based on the current tool schemas
function generateETag(tools: any[]): string {
    const hash = crypto.createHash('md5').update(JSON.stringify(tools)).digest('hex');
    return `"${hash}"`;
}

// 1. The Discovery Endpoint
app.get('/server/discover', (req, res) => {
    const eTag = generateETag(currentTools);
    
    // Return the manifest alongside the ETag in the headers
    res.setHeader('ETag', eTag);
    res.json({
        protocol_version: "2.0.0-stateless",
        tools: currentTools
    });
});

// 2. The Execution Endpoint
app.post('/tools/call', (req, res) => {
    const clientETag = req.headers['if-match'];
    const currentETag = generateETag(currentTools);
    
    // 3. ETag Validation (The core of Stateless Safety)
    // If the client's cached ETag doesn't match the server's current reality, reject the request.
    if (!clientETag || clientETag !== currentETag) {
        console.warn(`[Server] Rejected request. Client ETag ${clientETag} is stale.`);
        // HTTP 412 Precondition Failed tells the client to refresh its cache
        return res.status(412).json({ 
            error: "Tool manifest has been updated. Please call /server/discover." 
        });
    }
    
    // 4. ETag matches! Execute the tool safely.
    const requestedTool = req.body.params.name;
    console.log(`[Server] Safely executing tool: ${requestedTool}`);
    
    // ... actual tool execution logic ...
    
    res.json({ status: "success", content: `Data for ${requestedTool}` });
});

app.listen(8080, () => {
    console.log('Stateless MCP ETag Server running on port 8080');
});
```

By leveraging `ETags` and `HTTP 412` responses, AI Engineers created a seamless, zero-maintenance discovery loop. Agents remain entirely stateless, servers remain horizontally scalable, and latency is minimized, all while guaranteeing that tool schemas are always perfectly synchronized.
