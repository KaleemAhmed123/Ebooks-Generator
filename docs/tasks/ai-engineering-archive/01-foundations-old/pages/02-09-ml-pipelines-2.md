### Serialise once, deploy everywhere

:::mint
```python
import joblib
joblib.dump(pipe, "model.joblib")           # save fitted pipeline
pipe = joblib.load("model.joblib")          # load in production
pipe.predict(new_data)                      # same transforms, guaranteed
```
:::

:::warn
**Never fit the scaler on the full dataset before train/test split.** The scaler learns the mean and standard deviation. If those statistics include test samples, your model implicitly knows something about the test distribution. This inflates accuracy estimates. Always split first, then fit transformers only on training data — or use a pipeline which enforces this automatically.
:::
