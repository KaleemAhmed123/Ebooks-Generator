## Event time vs processing time

- **Event time** is when something happened; **processing time** is when this system saw it. Kafka adds a third, ingestion time, for when the broker received it. The three agree on a healthy pipeline and diverge under any delay — a mobile client offline for an hour, a retry, a slow upstream hop

<svg viewBox="0 0 460 100" role="img" aria-label="Event time versus processing time. A skew plot showing the gap between when records happened and when the system saw them, widening then narrowing." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M30 80 L430 80" stroke="#333"/>
  <path d="M30 80 L30 15" stroke="#333"/>
  <text x="10" y="20" font-size="6.5">skew</text>
  <path d="M30 30 C 150 30, 200 70, 260 40 S 380 20, 420 25" fill="none" stroke="#bf4c28" stroke-width="1.3"/>
  <text x="140" y="62" font-size="6.5" fill="#555">event time</text>
  <path d="M30 30 L420 30" stroke="#1d4e89" stroke-dasharray="2 2"/>
  <text x="380" y="20" font-size="6.5" fill="#1d4e89">processing time</text>
</svg>

- Metrics computed on processing time change their own answer every time the pipeline replays the same input, because "now" is different on every run. Metrics computed on event time give the same answer on every replay, which is the entire point of being able to replay a log at all (Module 7)
- Choosing event time is not free: it requires deciding when a window is "done" despite not controlling when events arrive, which is exactly what a watermark answers (page 4)

### The failure

- A dashboard built on processing time that shows a different total for "yesterday's orders" every time the job reprocesses yesterday, because late-arriving records land in whatever processing-time bucket happens to be open when they finally show up
