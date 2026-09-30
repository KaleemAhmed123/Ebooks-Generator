## Named entity recognition

- **Named entity recognition (NER)** finds and labels the real-world things a text mentions — people, organizations, places, dates, money. It is classification done *per token* instead of per document.
- *"**Tim Cook** joined **Apple** in **1998**"* → `Tim Cook` = PERSON, `Apple` = ORG, `1998` = DATE.

### The BIO tagging scheme

- An entity can span several words, so each token gets a tag with a prefix: **B**-egin, **I**-nside, or **O**-utside an entity.
- *"Tim Cook joined Apple"* → `B-PER I-PER O B-ORG`. The B/I split marks where one entity ends and the next begins, so *"New York Times"* stays one org, not three.

<svg viewBox="0 0 370 64" role="img" aria-label="Tokens tagged with BIO labels marking a person and an organization" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <g text-anchor="middle"><text x="45" y="24">Tim</text><text x="120" y="24">Cook</text><text x="200" y="24">joined</text><text x="290" y="24">Apple</text></g>
  <g><rect x="22" y="34" width="46" height="18" rx="3" fill="#24405e"/><text x="45" y="47" text-anchor="middle" fill="#fff" font-size="8">B-PER</text>
     <rect x="97" y="34" width="46" height="18" rx="3" fill="#24405e"/><text x="120" y="47" text-anchor="middle" fill="#fff" font-size="8">I-PER</text>
     <rect x="180" y="34" width="40" height="18" rx="3" fill="#ccc"/><text x="200" y="47" text-anchor="middle" font-size="8">O</text>
     <rect x="267" y="34" width="46" height="18" rx="3" fill="#1a3a2a"/><text x="290" y="47" text-anchor="middle" fill="#fff" font-size="8">B-ORG</text></g>
</svg>

:::note
NER is the workhorse behind resume parsers, medical-record extraction, search, and the "structured data from messy text" step feeding countless pipelines. Modern systems fine-tune a transformer to predict the BIO tag for every token at once. The failure mode to watch: **ambiguous entities** — *"Amazon"* the company vs. the river, *"Jordan"* the person vs. the country — resolved only by context, which is why context-aware models replaced dictionary lookups.
:::
