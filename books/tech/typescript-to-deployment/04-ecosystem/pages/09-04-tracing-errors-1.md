## Tracing and error reporting

- Logs describe one process. Metrics describe one service. Neither can follow a single request across five of them
- When a checkout takes four seconds, the question is which hop spent them, and no log line on any one service can answer it
- **Distributed tracing** answers it by giving a request an id at the edge and passing that id along with every call it makes
- Each unit of work records a **span**: a name, a start time, a duration and its parent. Together they form a tree showing where the time went
- **OpenTelemetry** is the vendor-neutral standard for producing that data, which matters because it decouples your code from whichever backend stores it
- Its auto-instrumentation patches the libraries you already use, so Express, Postgres and Redis emit spans with no code changes
- **Error reporting** is a separate job. It groups identical stack traces, so ten thousand occurrences become one issue with a count rather than ten thousand log lines
