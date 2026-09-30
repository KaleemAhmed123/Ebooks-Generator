# 04. Advanced Agentic Messaging: Streaming, Triggers, and MRTR

## The Asynchronous Event Architecture

```mermaid
graph TD
    subgraph Synchronous Blocking (Failed 2024 Model)
        A[Agent] -->|1. Request Tool (5 min job)| B(Server)
        B -.->|2. Processing...| B
        A -.->|3. Timeout Error| A
    end
    
    subgraph 2026 MRTR & Webhook Architecture
        C[Agent] -->|1. Request Tool (Async)| D(Stateless Server)
        D -->|2. HTTP 202 Accepted + JobID| C
        D -->|3. Starts Background Job| E[Job Worker]
        E -->|4. Push progress updates| F{Event Broker / MRTR}
        F -->|5. Streams via SSE/Webhook| C
        F -->|5. Streams to Frontend UI| G[User Interface]
    end
```

## The Problem: The Blocking I/O Timeout

As we solved server fragility with statelessness (Lesson 01) and scaling with Kubernetes (Lesson 03), we slammed into the fundamental limitation of HTTP: **Blocking I/O and Timeouts**.

In the real world, enterprise tools take time. If an agent calls a tool to `run_full_integration_tests` or `generate_quarterly_financial_report`, that tool might take 10 minutes to execute. 

If the agent sends a standard REST POST request to the server, the HTTP connection will hang while waiting for the response. Within 30 to 60 seconds, standard load balancers and API gateways will violently kill the connection, throwing a `504 Gateway Timeout`. The agent assumes the tool failed, retries, and accidentally triggers a *second* 10-minute job.

Furthermore, a human user sitting at a frontend UI starring at a spinning loading wheel for 10 minutes will assume the app is broken.

## The Solution: MRTR, Webhooks, and SSE

To handle Long-Running Agentic Tasks, the 2026 MCP specification codified the **Model-to-Resource Transfer Router (MRTR)** pattern, heavily utilizing standard asynchronous web architecture.

1.  **Immediate Acknowledgment (HTTP 202)**: When the agent requests a long-running tool, the server immediately responds with an `HTTP 202 Accepted` and a `Job ID`. The HTTP request closes instantly.
2.  **Background Processing**: The server hands the heavy workload to a background worker (e.g., Celery, BullMQ).
3.  **Real-Time Streaming**: As the worker executes, it publishes its status (e.g., "Tests 50% complete", or intermediate agent thoughts) to an Event Broker.
4.  **Webhooks & SSE**: The Agent (and the User UI) subscribes to these updates using Server-Sent Events (SSE) or Webhooks. When the job finishes, the final result is pushed to the agent.

## Implementation: Building Async Agentic Tools

Let's look at how to implement an asynchronous tool execution flow that streams intermediate updates to both the Agent and the User Interface.

### Python: The Asynchronous Webhook Server

In Python, we use FastAPI to implement the immediate acknowledgment and background task pattern.

```python
from fastapi import FastAPI, BackgroundTasks, Request
from fastapi.responses import JSONResponse
import httpx
import time

app = FastAPI()

# 1. The Async Tool Execution Endpoint
@app.post("/tools/call_async")
async def call_tool_async(req: Request, background_tasks: BackgroundTasks):
    data = await req.json()
    tool_name = data["params"]["name"]
    webhook_url = data["client_capabilities"]["webhook_callback_url"]
    
    # Generate a unique Job ID
    job_id = f"job_{time.time()}"
    
    # 2. Hand off the heavy work to a background thread
    background_tasks.add_task(execute_long_running_tool, job_id, tool_name, webhook_url)
    
    # 3. Immediately return HTTP 202 Accepted
    # The HTTP connection closes instantly, avoiding timeouts!
    return JSONResponse(status_code=202, content={"job_id": job_id, "status": "processing"})

async def execute_long_running_tool(job_id: str, tool_name: str, webhook_url: str):
    print(f"[Worker] Starting {tool_name} (Job: {job_id})")
    
    async with httpx.AsyncClient() as client:
        # Simulate a 5-minute task with intermediate progress updates
        for progress in [25, 50, 75]:
            time.sleep(2) # Simulating heavy I/O
            
            # 4. Push intermediate updates via Webhook
            # The UI can render these so the user knows the AI is actively working
            await client.post(webhook_url, json={
                "job_id": job_id, 
                "status": "in_progress", 
                "progress_percent": progress
            })
            
        # 5. Push the final completed result
        await client.post(webhook_url, json={
            "job_id": job_id,
            "status": "completed",
            "content": f"Final Report Generated successfully."
        })
        print(f"[Worker] Finished Job: {job_id}")
```

### TypeScript: The UI Streaming Client (SSE)

On the client side (TypeScript), the User Interface needs to connect to the agent's stream to render the progress bars and intermediate "thoughts" of the agent, providing a premium 2026 UX.

```typescript
// Standard Browser TypeScript
function subscribeToAgentProgress(jobId: string) {
    console.log(`[UI] Subscribing to stream for Job: ${jobId}`);
    
    // 1. Establish a Server-Sent Events (SSE) connection
    // This allows the server to push text chunks to the browser in real-time.
    const eventSource = new EventSource(`https://api.enterprise.internal/stream/${jobId}`);
    
    // 2. Handle intermediate updates
    eventSource.addEventListener('progress', (event) => {
        const data = JSON.parse(event.data);
        
        // Update the UI progress bar
        document.getElementById('progress-bar').style.width = `${data.progress_percent}%`;
        
        // Show what the agent is currently "thinking" or "doing"
        document.getElementById('agent-status').innerText = `Agent Status: ${data.message}`;
    });
    
    // 3. Handle Job Completion
    eventSource.addEventListener('completed', (event) => {
        const data = JSON.parse(event.data);
        
        // Render the final report
        document.getElementById('final-output').innerText = data.content;
        
        // Close the stream cleanly
        eventSource.close();
        console.log(`[UI] Job ${jobId} complete. Stream closed.`);
    });
    
    // 4. Handle Errors
    eventSource.onerror = (error) => {
        console.error("[UI] Stream disconnected unexpectedly", error);
        eventSource.close();
    };
}

// Triggered when the user clicks "Generate 100-page Report"
subscribeToAgentProgress("job_1727532345");
```

### Julia: The Advanced MRTR Broker

In highly complex, multi-agent systems, direct webhooks aren't enough. Hundreds of agents and tools are firing concurrently. AI Engineers use Julia to build **MRTR (Model-to-Resource Transfer Routers)**—a message broker specifically optimized for routing AI context chunks between sub-agents and databases via WebSocket multiplexing.

```julia
using WebSockets
using HTTP
using JSON

# A simple Julia-based MRTR Event Router
# It receives messages from background workers and routes them 
# to the specific Agent client waiting for the result.
const ACTIVE_AGENT_CONNECTIONS = Dict{String, WebSocket}()

function mrtr_handler(req::HTTP.Request, ws::WebSocket)
    # The agent connects and identifies itself with a Job ID
    job_id = HTTP.header(req, "X-Job-ID")
    ACTIVE_AGENT_CONNECTIONS[job_id] = ws
    
    println("[MRTR Broker] Agent subscribed to job: $job_id")
    
    try
        # Keep the socket open to push updates
        while isopen(ws)
            # In a real broker, this loop pulls from Kafka or RabbitMQ
            # and pushes the message down the socket to the agent.
            msg = readavailable(ws)
        end
    catch e
        println("[MRTR Broker] Connection closed for $job_id")
    finally
        delete!(ACTIVE_AGENT_CONNECTIONS, job_id)
    end
end

# An internal API route for the Background Worker to POST updates to
function worker_update_receiver(req::HTTP.Request)
    data = JSON.parse(String(req.body))
    job_id = data["job_id"]
    
    # If the Agent is connected and waiting, push the data to them instantly
    if haskey(ACTIVE_AGENT_CONNECTIONS, job_id)
        ws = ACTIVE_AGENT_CONNECTIONS[job_id]
        write(ws, JSON.json(data))
        return HTTP.Response(200, "Update routed to agent.")
    else
        # If the agent disconnected, we buffer the message in a database for later retrieval
        buffer_message(job_id, data)
        return HTTP.Response(202, "Agent disconnected. Update buffered.")
    end
end
```

By transitioning to **Async HTTP 202**, **Webhooks**, and **MRTR Streaming**, AI Engineers fundamentally unbound the lifespan of an agent from the physical constraints of a TCP connection socket, allowing AI systems to perform deep, multi-day reasoning tasks natively.
