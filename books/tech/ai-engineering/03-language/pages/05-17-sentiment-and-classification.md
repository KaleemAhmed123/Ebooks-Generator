## Sentiment and text classification

- **Text classification** assigns a label to a document: spam / not spam, topic, intent, language. **Sentiment analysis** is the best-known case — is this review positive or negative?
- Every classifier follows the booklet's pipeline: text → vector → model → label. Only the vector-maker and the final layer change.

### The ladder of approaches

- **Counting + linear model.** TF-IDF vector into logistic regression. Fast, interpretable, still the right first move on a narrow task.
- **Embeddings + small net.** Average the word embeddings, or run an RNN/CNN, then a classifier head. Captures similarity the counter misses.
- **Fine-tuned transformer.** Take a pretrained model (BERT, later in this booklet) and train a tiny classification head on top. State of the art when you have the data and the compute.

:::mint
```python
# strong baseline in four lines — often within 1-2% of a transformer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
X = TfidfVectorizer().fit_transform(train_texts)
clf = LogisticRegression().fit(X, train_labels)
```
:::

:::warn
Sentiment breaks on the things that make language human. **Negation** — *"not good"* flips *"good"*, but a bag-of-words counter sees both words and leans positive. **Sarcasm** — *"oh great, another bug"* is negative in a positive costume. **Domain shift** — *"unpredictable"* praises a movie plot and damns a car's brakes. Always test on text from the domain you will actually serve, not a generic benchmark.
:::
