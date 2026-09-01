## The bootstrap script

- Every command from Modules 2 and 5, in one file, committed to the repository. It turns a blank box into a prepared one

```bash
#!/usr/bin/env bash
# bootstrap.sh - blank Ubuntu 26.04 to ready. Run as root.
set -euo pipefail

DEPLOY_USER="${DEPLOY_USER:-kaleem}"
SSH_PUBKEY="${SSH_PUBKEY:?SSH_PUBKEY is required}"

apt-get update && apt-get upgrade -y
apt-get install -y ca-certificates curl ufw fail2ban unattended-upgrades \
                   git restic age htop ncdu

# user
id -u "$DEPLOY_USER" &>/dev/null || adduser --disabled-password --gecos "" "$DEPLOY_USER"
usermod -aG sudo "$DEPLOY_USER"
install -d -m 700 -o "$DEPLOY_USER" -g "$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh"
echo "$SSH_PUBKEY" > "/home/$DEPLOY_USER/.ssh/authorized_keys"
chmod 600 "/home/$DEPLOY_USER/.ssh/authorized_keys"
chown "$DEPLOY_USER:$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh/authorized_keys"

# sshd
cat > /etc/ssh/sshd_config.d/99-hardening.conf <<CONF
PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
MaxAuthTries 3
AllowUsers $DEPLOY_USER
CONF
sshd -t && systemctl reload ssh

# firewall
ufw --force default deny incoming
ufw --force default allow outgoing
ufw allow OpenSSH && ufw allow 80/tcp && ufw allow 443/tcp
ufw --force enable
```
