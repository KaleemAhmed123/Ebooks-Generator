## journalctl

- systemd collects logs into a binary journal. `journalctl` reads it

```bash
journalctl -u nginx                     # one unit
journalctl -u nginx -f                  # follow
journalctl -u nginx --since "1 hour ago"
journalctl -u nginx --since "2026-08-30 09:00" --until "09:30"
journalctl -p err -b                    # errors only, this boot
journalctl -b -1                        # the previous boot, after a crash
journalctl -k | grep -i "out of memory" # kernel messages
```

- `-b -1` is the one that explains an unexplained reboot. The journal survives restarts

### Capping the size

- An uncapped journal quietly consumes gigabytes

```bash
sudo journalctl --disk-usage
# Archived and active journals take up 1.8G

sudo journalctl --vacuum-size=200M
```

- Make it permanent in `/etc/systemd/journald.conf`:

```text
SystemMaxUse=200M
```

```bash
sudo systemctl restart systemd-journald
```

### Container logs are not here

- Docker keeps container output in its own JSON files, not the journal. `docker logs` reads those
- Page 05-05 caps their size, and page 15-08 ships them to Loki so both live in one place
