### If SSH will not connect

- A completely full disk stops sshd writing session files. Use the provider recovery console
- Free something, anything, then reconnect normally

### Afterwards

- Set `daemon.json` log limits, page 05-05
- Add the `predict_linear` alert from page 15-09, which fires hours before this happens again
- Consider a separate volume for `/var/lib/docker`, so a runaway container cannot take the root filesystem with it
