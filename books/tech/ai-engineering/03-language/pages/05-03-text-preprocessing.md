## Text preprocessing

- Before counting or embedding, raw text is cleaned into a stream of **tokens** — the units the model consumes. Three classic operations do the cleaning.
- **Tokenization** — split a string into tokens. *"The cats ran."* → `["The", "cats", "ran", "."]`.
- **Stemming** — chop suffixes with blind rules. Fast and dumb. `running → run`, but also `organization → organ`.
- **Lemmatization** — reduce a word to its dictionary form using grammar. Slower, correct. `ran → run`, `better → good`.

:::mint
```python
import re
def tokenize(text):
    # words (keeping inner apostrophes), numbers, or single punctuation
    return re.findall(r"[A-Za-z]+(?:'[A-Za-z]+)?|[0-9]+|[^\sA-Za-z0-9]", text)

tokenize("The cats weren't running.")
# ['The', 'cats', "weren't", 'running', '.']
```
:::

### Stem or lemmatize?

- **Stem** when speed matters and noise is tolerable — search indexing, rough classification.
- **Lemmatize** when meaning matters and a human reads the output — question answering, semantic search.
- Modern transformers skip both. They use **subword tokenization** (page 05-24) and let the model learn word forms from data.

:::warn
The top production NLP bug: **train/inference preprocessing mismatch.** Train on lowercased, stemmed text, then serve raw user input, and accuracy quietly craters. Ship the preprocessing as one function inside the model package — never a notebook cell the serving team re-writes. Pin library versions too: NLTK and spaCy change tokenization between releases, silently shifting the distribution your model was trained on.
:::
