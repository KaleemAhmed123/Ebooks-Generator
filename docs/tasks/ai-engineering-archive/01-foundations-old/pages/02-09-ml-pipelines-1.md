## ML pipelines — preventing data leakage

- An **ML pipeline** is an ordered sequence of data transformers plus a final model, packaged as a single object. The entire pipeline is `.fit()` on training data and `.transform()` (never `.fit_transform()`) on test/production data
- **Data leakage** — information from the test set or future data contaminating training. The most common form: fitting a scaler on the full dataset before splitting. The scaler's mean and std include test samples, making training evaluation optimistically biased
- A pipeline prevents leakage structurally: during cross-validation, each fold's preprocessing is fitted only on that fold's training portion

### The leakage failure and the pipeline fix

<svg viewBox="0 0 460 72" role="img" aria-label="Leaky flow: scaler fitted on all data including test. Correct flow: pipeline fits scaler only on train, transforms test separately" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="4" y="8" width="204" height="56" rx="3" fill="#fff0f0" stroke="#c04040"/>
  <text x="106" y="24" text-anchor="middle" font-weight="bold" fill="#c04040">Leaky (wrong)</text>
  <text x="106" y="38" text-anchor="middle">scaler.fit_transform(X_all)</text>
  <text x="106" y="52" text-anchor="middle" fill="#c04040">then split → test stats leaked</text>
  <rect x="252" y="8" width="204" height="56" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="354" y="24" text-anchor="middle" font-weight="bold" fill="#24405e">Correct (pipeline)</text>
  <text x="354" y="38" text-anchor="middle">pipe.fit(X_train)</text>
  <text x="354" y="52" text-anchor="middle" fill="#24405e">pipe.predict(X_test) ✓</text>
</svg>

### A production-ready sklearn pipeline

:::mint
```python
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer

num_pipe = Pipeline([("impute", SimpleImputer()), ("scale", StandardScaler())])
cat_pipe = Pipeline([("impute", SimpleImputer(strategy="most_frequent")),
                     ("encode", OneHotEncoder(handle_unknown="ignore"))])
pre = ColumnTransformer([("num", num_pipe, num_cols), ("cat", cat_pipe, cat_cols)])
pipe = Pipeline([("pre", pre), ("model", XGBClassifier())])
pipe.fit(X_train, y_train)   # everything fitted on train only
```
:::
