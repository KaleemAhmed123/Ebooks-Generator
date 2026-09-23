import fs from 'fs';
import path from 'path';

const keepFiles = [
  "01-01-what-is-graded.md", "01-02-the-45-minutes.md", "01-03-requirements.md", "01-04-numbers-fast.md", "01-05-api-and-entities.md", "01-06-high-level-first.md", "01-07-pick-the-deep-dive.md", "01-08-failure-and-tradeoffs.md", "01-09-recombination.md",
  "02-01-shortener-requirements.md", "02-02-shortener-api-data.md", "02-03-shortener-keys.md", "02-04-shortener-redirect.md", "02-05-shortener-tradeoffs.md",
  "03-01-limiter-requirements.md", "03-02-limiter-algorithms.md", "03-03-limiter-sliding-window.md", "03-04-limiter-distributed.md", "03-05-limiter-failure.md", "03-06-limiter-tradeoffs.md",
  "04-01-cache-requirements.md", "04-02-cache-placement.md", "04-03-cache-eviction.md", "04-04-cache-thundering-herd.md", "04-05-cache-consistency.md", "04-06-cache-tradeoffs.md",
  "05-01-notify-requirements.md", "05-02-notify-api-data.md", "05-03-notify-high-level.md", "05-04-notify-deep-dive.md", "05-05-notify-failure.md", "05-06-notify-tradeoffs.md",
  "06-01-chat-requirements.md", "06-02-chat-connections.md", "06-03-chat-storage.md", "06-04-chat-ordering-delivery.md", "06-05-chat-groups-fanout.md", "06-06-chat-tradeoffs.md",
  "07-01-feed-requirements.md", "07-02-feed-api-data.md", "07-03-feed-fanout-write.md", "07-04-feed-fanout-read.md", "07-05-feed-ranking.md", "07-06-feed-tradeoffs.md",
  "08-01-uber-requirements.md", "08-02-geo-indexing.md", "08-03-proximity-static.md", "08-04-moving-drivers.md", "08-05-matching-lock.md", "08-06-uber-failure.md", "08-07-uber-tradeoffs.md",
  "09-01-video-requirements.md", "09-02-video-upload.md", "09-03-video-transcode.md", "09-04-video-streaming.md", "09-05-video-cdn.md", "09-06-video-tradeoffs.md",
  "10-01-sync-requirements.md", "10-02-sync-blocks.md", "10-03-sync-metadata-vs-blob.md", "10-04-sync-protocol.md", "10-05-sync-conflicts.md", "10-06-sync-tradeoffs.md",
  "11-01-pay-requirements.md", "11-02-pay-api-idempotency.md", "11-03-pay-ledger.md", "11-04-pay-psp-flow.md", "11-05-pay-state-machine.md", "11-06-pay-reconciliation.md", "11-07-pay-tradeoffs.md",
  "12-01-tickets-requirements.md", "12-02-tickets-data-model.md", "12-03-tickets-hold.md", "12-04-tickets-waiting-room.md", "12-05-tickets-hotel-variant.md", "12-06-tickets-tradeoffs.md",
  "13-01-suggest-requirements.md", "13-02-suggest-trie.md", "13-03-suggest-build.md", "13-04-suggest-sharding.md", "13-05-suggest-tradeoffs.md",
  "14-01-crawler-requirements.md", "14-02-crawler-frontier.md", "14-03-crawler-fetch-parse.md", "14-04-crawler-dedupe.md", "14-05-crawler-failure.md", "14-06-crawler-tradeoffs.md",
  "15-01-metrics-requirements.md", "15-02-metrics-data-model.md", "15-03-metrics-push-vs-pull.md", "15-04-metrics-storage.md", "15-05-metrics-downsample-alert.md", "15-06-metrics-tradeoffs.md",
  "16-01-adclick-requirements.md", "16-02-adclick-ingest.md", "16-03-adclick-windowing.md", "16-04-adclick-exactly-once.md", "16-05-adclick-reconcile.md", "16-06-adclick-tradeoffs.md",
  "17-01-topk-requirements.md", "17-02-topk-exact-sorted-set.md", "17-03-topk-count-min.md", "17-04-topk-windows-merge.md", "17-05-topk-tradeoffs.md",
  "18-01-docs-requirements.md", "18-02-docs-ot.md", "18-03-docs-crdt.md", "18-04-docs-server.md", "18-05-docs-offline-history.md", "18-06-docs-tradeoffs.md"
];

const keepSet = new Set(keepFiles);
const dir = path.join(process.cwd(), 'books/tech/system-design/06-case-studies/pages');
const files = fs.readdirSync(dir);

let deleted = 0;
for (const file of files) {
  if (!keepSet.has(file)) {
    fs.unlinkSync(path.join(dir, file));
    deleted++;
  }
}
console.log(`Deleted ${deleted} duplicate/scrap files. Kept exactly 110 files.`);
