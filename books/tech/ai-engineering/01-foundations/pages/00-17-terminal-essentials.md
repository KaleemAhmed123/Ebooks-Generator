## Terminal essentials

- The **terminal** (command line) is how you drive machines that have no screen — every cloud GPU you rent. There is no desktop; you type commands.
- You need only a handful to be productive. The rest you look up.

### The daily set

:::mint
```bash
ls -lh              # list files, human-readable sizes
cd project/         # change directory
cat train.log       # print a file
grep "error" *.log  # find lines matching a pattern
nvidia-smi          # show GPU usage and memory — check often
```
:::

- **Pipe (`|`)** sends one command's output into the next: `cat train.log | grep loss` shows only the loss lines.
- **Redirect (`>`)** sends output to a file: `python train.py > run.log` captures everything.

### Running jobs that outlive your connection

- Close your laptop and a normal remote command dies with the connection. Long training must survive that.
- Start it inside **tmux** (a terminal that keeps running on the server) or with `nohup ... &`, then reconnect later to check on it.

:::warn
`nvidia-smi` is your most-used command on a rented GPU. It shows whether the GPU is actually being used and how much memory is left. If utilization sits near 0% during training, your data loading is the bottleneck — the expensive GPU is idling while the CPU feeds it too slowly.
:::
