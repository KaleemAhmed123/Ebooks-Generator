# Module 6 - CAP and PACELC

## CAP as Gilbert and Lynch proved it

- The theorem (Gilbert and Lynch, 2002) uses three exact terms. **C** is linearizability (Module 5, page 2). **A** is: every request received by a non-failing node gets a non-error response. **P** is: the network may lose any number of messages between nodes. In an asynchronous network you cannot guarantee all three
- The proof is one picture. Cut the network in two; a write lands on one side; a read arrives on the other. Answer it and the answer is stale (C lost). Refuse or wait forever and the request got no response (A lost)

<svg viewBox="0 0 460 120" role="img" aria-label="A partition splits nodes N1 and N2. A client writes x=1 to N1. Another client reads x from N2. N2 cannot hear N1. It either answers x=0, losing consistency, or refuses, losing availability." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="80" y="40" width="70" height="34" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="115" y="57" text-anchor="middle" font-weight="bold">N1</text>
  <text x="115" y="68" text-anchor="middle" font-size="7">x = 1</text>
  <rect x="310" y="40" width="70" height="34" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="345" y="57" text-anchor="middle" font-weight="bold">N2</text>
  <text x="345" y="68" text-anchor="middle" font-size="7">x = 0</text>
  <line x1="230" y1="10" x2="230" y2="110" stroke="#b8541a" stroke-width="2" stroke-dasharray="5 3"/>
  <text x="230" y="118" text-anchor="middle" font-size="7" fill="#b8541a">partition: no message crosses</text>
  <path d="M150 57 H222" stroke="#1a1a1a" stroke-dasharray="2 2" fill="none"/>
  <text x="186" y="52" text-anchor="middle" font-size="7">replicate x=1: lost</text>
  <path d="M10 50 H80" stroke="#1a1a1a" fill="none"/><path d="M80 50 l-5 -2.5 v5 z" fill="#1a1a1a"/>
  <text x="44" y="45" text-anchor="middle" font-size="7">write x=1</text>
  <path d="M450 50 H380" stroke="#1a1a1a" fill="none"/><path d="M380 50 l5 -2.5 v5 z" fill="#1a1a1a"/>
  <text x="415" y="45" text-anchor="middle" font-size="7">read x</text>
  <text x="345" y="92" text-anchor="middle" font-size="7.5">answer 0: not C</text>
  <text x="345" y="104" text-anchor="middle" font-size="7.5">refuse: not A</text>
</svg>

- P is not one of the choices. Any system whose nodes talk over a network will lose messages; the theorem asks what you give up **when** that happens. A "CA" design is a design with no answer for the day the switch fails
- The choice is per operation and per partition, not per system (Brewer, 2012): the "two of three" slogan was always misleading, and when the network is healthy there is no reason to give up either C or A

### The failure

- Reading A as "highly available", the operations term. CAP's A is the theorem's: every non-failing node answers every request. A system that fails over to a new leader in two seconds is unavailable in the CAP sense for those two seconds and perfectly available in the SLA sense. The two uses do not meet
