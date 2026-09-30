## Anomaly detection

- **Anomaly detection** finds the points that do not fit — fraud, intrusions, failing machines, corrupt data.
- It differs from classification in one way that shapes everything: you have almost no examples of the thing you are hunting. You cannot train on "fraud" when fraud is 0.01% of the data and constantly changing shape.

### The approach: learn "normal", flag the rest

- Model what normal looks like, then score how far each point departs from it. Big departure → anomaly.
- **Isolation Forest** — anomalies are easy to isolate with a few random splits (they sit alone), so it scores points by how quickly a random tree separates them.
- **One-class SVM** — draws a boundary around the normal data; anything outside is anomalous.

<svg viewBox="0 0 300 82" role="img" aria-label="A dense cloud of normal points with two isolated outliers flagged far away" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <ellipse cx="120" cy="45" rx="70" ry="28" fill="#e8f4fd" stroke="#24405e" stroke-dasharray="3 2"/>
  <g fill="#24405e"><circle cx="100" cy="40" r="2"/><circle cx="120" cy="50" r="2"/><circle cx="135" cy="38" r="2"/><circle cx="110" cy="55" r="2"/><circle cx="145" cy="52" r="2"/><circle cx="125" cy="42" r="2"/></g>
  <circle cx="250" cy="20" r="3.5" fill="#c0392b"/><text x="250" y="14" text-anchor="middle" fill="#c0392b">anomaly</text>
  <circle cx="40" cy="70" r="3.5" fill="#c0392b"/><text x="40" y="82" text-anchor="middle" fill="#c0392b">anomaly</text>
</svg>

:::warn
The hard part is not detection but the **threshold**. Set it tight and you drown in false alarms; loose and you miss real events. And "normal" drifts — last month's baseline is wrong today. Anomaly detectors need continuous recalibration, not a one-time fit.
:::
