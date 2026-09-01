### Publishing ports

```bash
-p 3000:3000              # every interface. Reachable from the internet
-p 127.0.0.1:3000:3000    # loopback only. What you want behind a proxy
-p 3000:3000/udp
-P                        # publish everything EXPOSE names, on random ports
```

- **Published ports bypass the host firewall on Linux**, because Docker writes its own iptables rules. `ufw` will say the port is closed and it will be open
- **Bind to `127.0.0.1` and let the reverse proxy be the only public listener.** That is the fix
