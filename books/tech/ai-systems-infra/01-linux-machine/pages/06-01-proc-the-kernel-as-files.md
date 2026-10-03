# Seeing Inside the Machine

## /proc — the kernel as files

- You don't need a special tool to inspect a running process — the kernel already exposes its state as files under **`/proc`**. Every running PID has a directory `/proc/<pid>/` whose files are a live window into that process, read with `cat` like any other file.
- The ones you'll reach for constantly:
  - **`/proc/<pid>/status`** — state (R/S/D/Z), threads, and `VmRSS`/`VmSize` (the RSS/VSZ from Module 3), in plain text.
  - **`/proc/<pid>/fd/`** — one symlink per open fd; `ls | wc -l` is your fd-leak detector (Module 4).
  - **`/proc/<pid>/maps`** / **`smaps_rollup`** — the memory map and a per-process memory breakdown (including PSS).
  - **`/proc/<pid>/limits`** — the effective `ulimit`s this process actually got.
  - System-wide: **`/proc/meminfo`** (where `available` lives), **`/proc/stat`**, **`/proc/loadavg`**.
- This is the data source the fancy tools read. `top`, `ps`, and most monitoring agents are, underneath, parsers of `/proc`. Knowing that means when a dashboard looks wrong, you can go to the source and check by hand.

:::lab
Pick any running service's PID. `cat /proc/<pid>/status` and read its state and `VmRSS`. `ls /proc/<pid>/fd` and count its open fds. `cat /proc/<pid>/limits` and find `Max open files`. You've just read, by hand, everything a monitoring agent would have charted — and you now know where the numbers come from.
:::
