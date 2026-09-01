### The order matters

- **Copy your key to the new user before disabling root login.** Getting that backwards locks you out, and the recovery is a provider console session
- **Open a second SSH session and confirm `ssh deploy@host` works before closing the first one.** Every experienced person has locked themselves out exactly once

### Swap, and why 2 GB

- Swap is slow, and **the alternative is the kernel killing your database**. `swappiness=10` means it is used only under real pressure
- On a 4 GB box, 2 GB of swap is the usual choice. It is insurance, not capacity

- The next three pages are SSH, the firewall, and automatic updates. **None of them are optional**
