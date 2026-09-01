## `child_process`

- Not everything you need is a Node library. Sometimes the tool is `ffmpeg`, `git`, `pdftotext` or a Python script
- A **child process** runs another program from inside yours and gives you its output
- Because it is a separate operating system process, it has its own memory and its own CPU time, so it cannot block your event loop
- The four functions Node offers differ on two axes, and picking wrongly is how command injection and memory blowouts happen
- The first axis is whether output arrives as a **stream** or is **buffered** into memory, which decides what happens with a gigabyte of logs
- The second is whether the command runs through a **shell**, which decides whether user input can become a command

```js
import { spawn, exec, execFile, fork } from "node:child_process"
```

### `spawn` - streams, no shell

```js
const proc = spawn("ffmpeg", ["-i", "in.mp4", "out.mp4"])

proc.stdout.on("data", (d) => console.log(d.toString()))
proc.on("close", (code) => console.log("exit", code))
```

- Output arrives as a stream, so a gigabyte of logs uses constant memory

### `exec` - runs a shell, buffers output

```js
exec("git rev-parse HEAD", (err, stdout) => console.log(stdout.trim()))
```

- Convenient and dangerous. It runs a shell, so user input becomes a command injection
- Also buffers all output in memory and fails past `maxBuffer`, 1MB by default
