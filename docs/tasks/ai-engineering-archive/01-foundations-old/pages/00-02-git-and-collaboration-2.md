### Branching convention for experiments

:::mint
```bash
git checkout -b exp/adam-lr-3e-4
# run experiment, commit results
git checkout main
git merge exp/adam-lr-3e-4   # or discard the branch
```
:::

:::note
Model checkpoints should never live in git. At best they bloat the repo; at worst they carry weights trained on proprietary data. Use HuggingFace Hub, W&B Artifacts, or MLflow model registry for checkpoint storage.
:::

### Reading history

- `git log --oneline --graph` shows the experiment tree — which runs forked from where
- `git diff HEAD~1` shows exactly what changed between the last two commits
- `git bisect` finds the commit that broke a metric by binary-searching the history
