## Page cache, RSS, and VSZ

- Free RAM is wasted RAM, so the kernel doesn't leave it idle: it fills spare memory with the **page cache** — copies of file data read from or written to disk. That is why `free -m` shows little "free" on a healthy box, and why that alarms people who misread it. **Read `available`, not `free`** — the cache is instantly reclaimable when a process needs the RAM.
- Two numbers describe a process's memory, and confusing them wastes hours:
  - **RSS** (Resident Set Size) — the **physical RAM** the process occupies right now. This is the number that matters for OOM.
  - **VSZ** (Virtual Size) — the total **virtual** address space it has mapped, including reserved-but-untouched regions and shared libraries. VSZ is almost always far larger than RSS, and that's normal.

:::warn
Two accounting traps. **(1)** `top`'s `VIRT` (VSZ) looks huge for a Go or JVM process because of reserved address space — it is not RAM used; watch `RES` (RSS). **(2)** Shared pages (libc, `mmap`'d files) are counted in the RSS of *every* process that maps them, so **summing RSS across processes overcounts** real memory. For fair per-process accounting use **PSS** (proportional set size, in `/proc/<pid>/smaps_rollup`), which divides shared pages among their sharers.
:::

- Mental model for a container's memory: its cgroup counts **its process RSS + its share of page cache** against the limit. The cache portion is reclaimed first under pressure, but anonymous memory (heap, stacks) cannot be dropped — only swapped (next pages). So a leak in heap is what eventually kills you, not cached file reads.
