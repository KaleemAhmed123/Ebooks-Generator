### Tailscale, for a team

```bash
curl -fsSL https://tailscale.com/install.sh | sh
tailscale up --ssh --advertise-tags=tag:prod
```

- **The box joins a private network reachable only by your devices.** Admin interfaces bind to the Tailscale address and are invisible to the internet
- **`--ssh` replaces SSH keys with identity**, so removing someone from the team removes their access everywhere at once
- Plain **WireGuard** does the same with more setup and no dependency on a third party. **Headscale** is the self-hosted control plane if you want neither

### The rule

- **After every deploy, run `ss -tulpn | grep -v 127.0.0.1`.** The only public listeners should be 22, 80 and 443
- Anything else on that list is either intentional and documented, or an incident waiting
