## Cheatsheet: the first hour

```bash
# 1. patch
sudo apt update && sudo apt upgrade -y
sudo apt install -y unattended-upgrades fail2ban

# 2. a user that is not root
sudo adduser kaleem
sudo usermod -aG sudo kaleem

# 3. keys (run ssh-copy-id from the laptop)
ssh-copy-id kaleem@203.0.113.10

# 4. lock sshd down
sudo tee /etc/ssh/sshd_config.d/99-hardening.conf <<'CONF'
PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
MaxAuthTries 3
AllowUsers kaleem
CONF
sudo sshd -t && sudo systemctl reload ssh

# 5. firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# 6. swap
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# 7. identity and time
sudo hostnamectl set-hostname prod-1
sudo timedatectl set-timezone UTC
```
