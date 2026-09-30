## POS tagging and parsing

- **Part-of-speech (POS) tagging** labels each word with its grammatical role: noun, verb, adjective. *"time flies"* — is *"flies"* a verb (time moves fast) or a noun (a species of insect)? The tag decides the meaning.
- **Parsing** goes further: it builds the sentence's structure — which words modify which. Two common forms:
  - **Constituency parse** — nests words into phrases (a noun phrase, a verb phrase), like brackets.
  - **Dependency parse** — draws arrows from each word to the word it depends on.

<svg viewBox="0 0 360 74" role="img" aria-label="Dependency arrows from a verb to its subject and object" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <g text-anchor="middle"><text x="60" y="58">The cat</text><text x="180" y="58">chased</text><text x="300" y="58">the mouse</text></g>
  <g text-anchor="middle" font-size="7" fill="#6b6b6b"><text x="60" y="70">NOUN</text><text x="180" y="70">VERB</text><text x="300" y="70">NOUN</text></g>
  <path d="M175 46 Q120 12 65 46" fill="none" stroke="#24405e" marker-end="url(#p)"/><text x="118" y="18" text-anchor="middle" font-size="7" fill="#24405e">subject</text>
  <path d="M185 46 Q245 12 300 46" fill="none" stroke="#1a3a2a" marker-end="url(#p)"/><text x="245" y="18" text-anchor="middle" font-size="7" fill="#1a3a2a">object</text>
  <defs><marker id="p" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- POS tags feed lemmatization (page 05-03) and older pipelines; parses feed relation extraction and grammar checking.

:::note
Explicit grammar mattered enormously before neural models — every classical NLP system leaned on POS tags and parse trees. Large transformers now learn syntax *implicitly* from raw text and rarely need an explicit parse. Parsing survives where you must **read out** the structure — grammar tools, linguistic research, and pipelines that hand structured relations to a database.
:::
