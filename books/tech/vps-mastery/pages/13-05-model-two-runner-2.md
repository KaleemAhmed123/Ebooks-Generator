### The security note that matters

- **Never attach a self-hosted runner to a public repository.** Anyone opening a pull request could run arbitrary code on the server
- GitHub warns about this and the warning is not decorative. Private repositories only

### Keeping it fed

- The runner needs updating, and its disk grows with each workspace
- `_work` should be trimmed on a schedule, or it becomes another way the disk fills
