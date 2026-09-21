## Windows

- Four window shapes, Kafka Streams' own definitions: **tumbling** — "fixed-size, non-overlapping, gap-less"; **hopping** — "fixed-size, overlapping"; **sliding** — "fixed-size, overlapping windows that work on differences between record timestamps"; **session** — "dynamically-sized, non-overlapping, data-driven," closed by a gap in activity rather than a clock

<svg viewBox="0 0 460 110" role="img" aria-label="Four window types on separate timelines: tumbling windows with no gaps or overlap, hopping windows that overlap, sliding windows by record timestamp difference, and session windows closed by a gap in activity." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8">
  <text x="10" y="12" font-size="7">tumbling</text>
  <rect x="70" y="4" width="50" height="12" fill="none" stroke="#333"/><rect x="120" y="4" width="50" height="12" fill="none" stroke="#333"/><rect x="170" y="4" width="50" height="12" fill="none" stroke="#333"/>
  <text x="10" y="37" font-size="7">hopping</text>
  <rect x="70" y="29" width="60" height="12" fill="none" stroke="#bf4c28"/><rect x="105" y="29" width="60" height="12" fill="none" stroke="#bf4c28" opacity="0.6"/>
  <text x="10" y="62" font-size="7">sliding</text>
  <circle cx="90" cy="58" r="2" fill="#333"/><circle cx="105" cy="58" r="2" fill="#333"/><circle cx="130" cy="58" r="2" fill="#333"/><circle cx="160" cy="58" r="2" fill="#333"/>
  <path d="M85 58 L135 58" stroke="#1d4e89" stroke-dasharray="2 1"/>
  <text x="10" y="87" font-size="7">session</text>
  <rect x="70" y="79" width="30" height="12" fill="none" stroke="#333"/>
  <rect x="150" y="79" width="60" height="12" fill="none" stroke="#333"/>
  <text x="120" y="100" font-size="6" fill="#555">gap closes the window</text>
</svg>

- Tumbling windows never double-count: every record falls in exactly one window. Hopping windows overlap by design, so a record near a hop boundary counts toward more than one window's total — a sum over hopping windows is not the same operation as a sum over tumbling ones, even at the same size
- Session windows have no fixed size at all; a burst of activity followed by silence past the gap threshold closes the window right there, which is why they fit user-session-shaped data and nothing with a fixed reporting cadence

### The failure

- Summing a metric across hopping windows and reporting the total as if each event were counted once. An event near a window boundary is counted in every window it overlaps, inflating any sum that does not account for the overlap on purpose
