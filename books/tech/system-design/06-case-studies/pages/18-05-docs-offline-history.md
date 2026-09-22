## Offline and history

- Offline is the same problem as latency, stretched: a client keeps applying its own operations locally and queues them with the version they were based on; on reconnect it sends the queue, the server transforms each against everything since that version, and sends back what the client missed. History is the journal, made loadable by snapshots. Undo is an operation like any other, the inverse of one's own, transformed forward, never a rollback

<svg viewBox="0 0 460 156" role="img" aria-label="Offline replay and multiplayer undo. Top: a client goes offline at version 10 and queues five operations based on version 10. Meanwhile the server reaches version 40. On reconnect the client sends the five with base version 10; the server transforms each against operations 11 to 40 and applies them as 41 to 45, then sends the client operations 11 to 40 transformed against its five. Both end at version 45. A snapshot is stored every 1 000 operations, so a client opening the document loads the snapshot at 40 000 and replays the tail instead of the whole journal. Bottom: Alice deletes paragraph 1 as operation 12; Bob types paragraph 2 as operations 13 to 20; Alice presses undo: the client emits the inverse of operation 12, an insert of the deleted text, transformed against 13 to 20 so its index is right, as operation 21. Paragraph 1 is back and paragraph 2 stays. Figma's rule: undo, then someone else's change, then redo must leave that change untouched. An orange cross marks undo as a rollback to the state before operation 12, which erases Bob's paragraph." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="6" y="12" font-size="7.5" fill="#1d4e89">offline: queue with the base version, replay through the transform</text>
  <rect x="6" y="20" width="120" height="40" rx="3" fill="#fff" stroke="#333"/><text x="66" y="33" text-anchor="middle">client, offline at v10</text><text x="66" y="44" text-anchor="middle" font-size="7">queues o1…o5, based on v10</text><text x="66" y="54" text-anchor="middle" font-size="7">still editing locally</text>
  <rect x="192" y="20" width="132" height="40" rx="3" fill="#fff" stroke="#1d4e89"/><text x="258" y="33" text-anchor="middle">server, now at v40</text><text x="258" y="44" text-anchor="middle" font-size="7">transform o1…o5 against v11…v40,</text><text x="258" y="54" text-anchor="middle" font-size="7">apply as v41…v45, journal, broadcast</text>
  <line x1="126" y1="34" x2="192" y2="34" stroke="#333" marker-end="url(#d)"/><text x="159" y="29" text-anchor="middle" font-size="7">o1…o5 @v10</text>
  <line x1="192" y1="50" x2="126" y2="50" stroke="#1d4e89" marker-end="url(#b)"/><text x="159" y="66" text-anchor="middle" font-size="7" fill="#1d4e89">v11…v40 back</text>
  <rect x="348" y="20" width="106" height="40" rx="3" fill="#e6f2ff" stroke="#333"/><text x="401" y="33" text-anchor="middle">snapshots</text><text x="401" y="44" text-anchor="middle" font-size="7">every 1 000 ops; a new client</text><text x="401" y="54" text-anchor="middle" font-size="7">loads one + the journal tail</text>
  <line x1="324" y1="40" x2="348" y2="40" stroke="#333" stroke-dasharray="3 3" marker-end="url(#d)"/>
  <text x="6" y="86" font-size="7.5" fill="#1d4e89">undo: the inverse of my own op, transformed forward</text>
  <text x="6" y="100" font-size="7">op 12, Alice: delete paragraph 1 · ops 13–20, Bob: type paragraph 2 · Alice presses undo</text>
  <text x="6" y="112" font-size="7">→ op 21 = inverse(op 12) = insert the deleted text, transformed against 13–20 so its index is right; paragraph 1 is back, paragraph 2 stays</text>
  <text x="6" y="124" font-size="7">Figma's rule: undo, then a colleague's change, then redo must leave that change exactly as it was</text>
  <text x="6" y="146" font-size="7.5" fill="#bf4c28">✕ undo as a rollback to the state before op 12: paragraph 1 returns and Bob's paragraph 2 is gone, with nothing to point to</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
  </defs>
</svg>

- The client's queue is bounded by nothing but its own storage, so a week offline is a long transform, not a different mechanism; a conflict that cannot be transformed sensibly, both deleted the same text, resolves by the transform's rule, and the user sees the result, not a dialog. Figma reapplies offline edits on reconnect the same way
- Snapshots bound two things: the load time for a new client, and the journal that must be replayed on failover (page 4). The journal itself is the history feature: "show me Tuesday's version" is a snapshot plus a replay to a timestamp

### The failure

- Undo that reverts a colleague's change. Restoring "the document as it was before my last edit" restores it without everything typed since, by everyone; the operation model is what makes undo per person possible, and it means undo is one more operation through the same sequencer, with the same transform, never a state swap
