## Failure

- Three failures the interviewer names, in the order they come up: the driver's app drops mid-offer, the rider's app retries a request, a region is lost

<svg viewBox="0 0 460 150" role="img" aria-label="Two timelines of one offer, 0 to 20 seconds. Top, TTL 15 seconds: the offer is sent at 0, the driver's link is down from 1 to 8 seconds in a tunnel, the accept arrives at 9, inside the TTL, and the trip is accepted. Bottom, with an orange cross, TTL 5 seconds: the same tunnel, the offer expires at 5 and the next driver is offered, the first driver's accept arrives at 9 and is refused as no longer yours. Caption: set the TTL from the mobile network's tail, not its median." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="6" y="30" font-size="7.5">TTL 15 s</text>
  <line x1="60" y1="40" x2="345" y2="40" stroke="#1d4e89" stroke-width="3"/>
  <rect x="79" y="30" width="133" height="20" fill="#fbe9e2" stroke="none"/><text x="145" y="26" text-anchor="middle" font-size="7">tunnel: no link, 1–8 s</text>
  <line x1="60" y1="34" x2="60" y2="46" stroke="#333"/><text x="60" y="58" text-anchor="middle" font-size="7">offer sent</text>
  <line x1="231" y1="34" x2="231" y2="46" stroke="#333"/><text x="231" y="58" text-anchor="middle" font-size="7">accept arrives, 9 s</text>
  <line x1="345" y1="34" x2="345" y2="46" stroke="#1d4e89"/><text x="345" y="58" text-anchor="middle" font-size="7" fill="#1d4e89">expiry, 15 s</text>
  <text x="380" y="43" font-size="8" fill="#1d4e89">✓ accepted</text>
  <text x="6" y="90" font-size="7.5" fill="#bf4c28">✕ TTL 5 s</text>
  <line x1="60" y1="100" x2="155" y2="100" stroke="#bf4c28" stroke-width="3"/>
  <rect x="79" y="90" width="133" height="20" fill="#fbe9e2" stroke="none"/>
  <line x1="60" y1="94" x2="60" y2="106" stroke="#333"/><text x="60" y="118" text-anchor="middle" font-size="7">offer sent</text>
  <line x1="155" y1="94" x2="155" y2="106" stroke="#bf4c28"/><text x="155" y="118" text-anchor="middle" font-size="7" fill="#bf4c28">expired, 5 s: next driver offered</text>
  <line x1="231" y1="94" x2="231" y2="106" stroke="#333"/><text x="250" y="86" text-anchor="middle" font-size="7">accept arrives, 9 s</text>
  <text x="250" y="103" font-size="8" fill="#bf4c28">✕ "no longer yours"</text>
  <line x1="60" y1="134" x2="440" y2="134" stroke="#333"/>
  <g font-size="7" text-anchor="middle"><text x="60" y="146">0 s</text><text x="155" y="146">5 s</text><text x="250" y="146">10 s</text><text x="345" y="146">15 s</text><text x="440" y="146">20 s</text></g>
</svg>

- Driver drops mid-offer: the offer has a TTL (page 5); on expiry the row returns to `available` and the next candidate is offered. The TTL is set from the mobile network's tail, not its median. An accept that lands after expiry is answered "no longer yours", which is worse than a slower match, so 15 s beats 5 s here
- Rider retries: the request carries an idempotency key minted by the app (booklet 01); a second `POST /trips` with the same key returns the first trip. Without it: two trips, two drivers, one rider, one refund
- Region outage: the trip store replicates across regions (booklet 02). The cell index does not need to, because it rebuilds itself from the firehose within one report interval: drivers reconnect to the surviving region and the map is full again in about 4 s. The cost of failover is one interval of "no drivers nearby", not lost data

### The failure

- An offer TTL shorter than the mobile tail. The median accept is 3 s, the TTL is 5 s, and the 5 % of drivers on a bad link accept into an expired offer. They see "trip taken" for a trip they accepted; the design has trained its own supply to ignore offers
