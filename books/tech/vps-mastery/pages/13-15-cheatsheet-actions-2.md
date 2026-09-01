### Passing values between steps and jobs

```yaml
- id: meta
  run: echo "tag=$(git rev-parse --short HEAD)" >> "$GITHUB_OUTPUT"
- run: echo "${{ steps.meta.outputs.tag }}"

# job to job
outputs:
  tag: ${{ steps.meta.outputs.tag }}
```

### Debugging

```yaml
- run: echo "${{ toJSON(github) }}"       # the whole context
```

- Set repository secret `ACTIONS_STEP_DEBUG` to `true` for verbose runner logs
- `act` runs a workflow locally, close enough to catch YAML and shell errors

### The defaults that should always be changed

| Default | Set to |
|---|---|
| `permissions` inherited, broad | `contents: read`, add only what is needed |
| `cancel-in-progress` unset | `false` on a deploy, `true` on tests |
| Actions pinned to `main` | A major version tag, or a sha |
| No timeout | `timeout-minutes: 20`, so a hung job does not run for six hours |
