### Why it also matters for security

- Fewer packages in the final image means fewer known vulnerabilities to answer for, and no compiler for an attacker to use

### Building one stage only

```bash
docker build --target build -t marketplace/orders:debug .
```

- Useful when a compilation error needs inspecting inside the build environment
