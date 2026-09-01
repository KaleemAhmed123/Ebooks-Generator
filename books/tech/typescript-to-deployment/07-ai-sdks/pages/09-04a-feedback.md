## Capturing whether it worked

- Logs say what the system did. They do not say whether the answer helped, and that is the only measure that matters
- **User feedback is the training data for every improvement in this booklet**: the evaluation set, the prompt changes, the retrieval tuning

### Explicit signals

```http
POST /api/v1/messages/:id/feedback
{ "rating": "down", "reason": "wrong_information", "comment": "..." }
```

- **A thumbs down with no reason is nearly useless.** Offer four fixed reasons: wrong, incomplete, off-topic, unsafe
- Store it against the **message id**, so it joins back to the prompt version, the model, the retrieved chunks and the tool calls

### Implicit signals, which are more honest

| Signal | Suggests |
|---|---|
| the user rephrased and asked again | the answer missed |
| they copied the answer | it was useful |
| they clicked a citation | grounding worked |
| they escalated to a human | it failed |
| the conversation ended right after | resolved, or gave up |

- **Escalation rate is the best single metric for a support assistant**, because it is what the product exists to reduce

### Closing the loop

- **Review negatives weekly**, grouped by reason. Most cluster into two or three causes
- **Every confirmed failure becomes an evaluation case**, permanently. That is how the set stops being synthetic
- Reply to the user where you can. A feature that learns visibly gets used more, and gets more feedback
