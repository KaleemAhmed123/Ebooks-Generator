## The libuv thread pool

- "Node is single threaded" is only true of your JavaScript
- libuv keeps a pool of worker threads, four by default

:::mint
<svg viewBox="0 0 470 158" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 9px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .t { font: bold 7.5px Consolas, monospace; fill: #ef476e; }
  </style>
  <defs>
    <marker id="t1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="b" x="10" y="52" width="104" height="34" rx="4"/>
  <text x="62" y="67" class="l" text-anchor="middle">your JS</text>
  <text x="62" y="79" class="s" text-anchor="middle">one thread</text>

  <rect class="b" x="168" y="6" width="128" height="22" rx="3"/>
  <text x="232" y="21" class="s" text-anchor="middle">thread 1</text>
  <rect class="b" x="168" y="34" width="128" height="22" rx="3"/>
  <text x="232" y="49" class="s" text-anchor="middle">thread 2</text>
  <rect class="b" x="168" y="62" width="128" height="22" rx="3"/>
  <text x="232" y="77" class="s" text-anchor="middle">thread 3</text>
  <rect class="b" x="168" y="90" width="128" height="22" rx="3"/>
  <text x="232" y="105" class="s" text-anchor="middle">thread 4</text>

  <text x="232" y="128" class="t" text-anchor="middle">UV_THREADPOOL_SIZE, default 4</text>

  <line class="a" x1="116" y1="60" x2="164" y2="17" marker-end="url(#t1)"/>
  <line class="a" x1="116" y1="65" x2="164" y2="45" marker-end="url(#t1)"/>
  <line class="a" x1="116" y1="72" x2="164" y2="73" marker-end="url(#t1)"/>
  <line class="a" x1="116" y1="78" x2="164" y2="101" marker-end="url(#t1)"/>

  <text x="352" y="30" class="s">fs reads and writes</text>
  <text x="352" y="46" class="s">dns.lookup</text>
  <text x="352" y="62" class="s">crypto pbkdf2, scrypt</text>
  <text x="352" y="78" class="s">zlib compression</text>

  <text x="352" y="102" class="t">network IO does</text>
  <text x="352" y="114" class="t">NOT use the pool</text>
</svg>
:::

- Sockets use the operating system's own async facilities, so HTTP scales past four
- Four concurrent `pbkdf2` calls will queue the fifth

```bash
UV_THREADPOOL_SIZE=16 node app.js
```

- Raise it only when profiling shows pool contention, and never above your CPU count by much
