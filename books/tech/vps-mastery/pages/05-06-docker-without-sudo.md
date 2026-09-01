## Running docker without sudo

- The Docker socket is owned by the `docker` group. Adding a user to it removes the `sudo` prefix

```bash
sudo usermod -aG docker kaleem
newgrp docker            # apply in this shell, or log out and back in
docker ps                # works without sudo now
```

### Understand what was just granted

- A member of the `docker` group can run this:

```bash
docker run -it -v /:/host alpine chroot /host sh
```

- That mounts the entire host filesystem into a container and enters it as root. **Membership in `docker` is root access on the host, without a password prompt**
- Grant it to the same people who already have `sudo`, and to nobody else

### Why it is still worth doing

- Deploy scripts that need `sudo` need a password or a sudoers rule. Group membership avoids both
- Container commands written with `sudo` in front sometimes read a different `~/.docker/config.json` than expected, which breaks registry authentication in confusing ways

### Rootless Docker

- Docker can run entirely as an unprivileged user, which removes the escalation above
- The cost is real: publishing ports below 1024 needs extra configuration, some storage drivers behave differently, and most documentation assumes the normal setup
- Worth it on a shared machine. Not worth it on a single-purpose box run by one team
