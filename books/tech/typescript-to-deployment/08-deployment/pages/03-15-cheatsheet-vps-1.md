## Cheatsheet: the VPS

### First hour

```bash
apt update && apt full-upgrade -y
hostnamectl set-hostname orders-prod
timedatectl set-timezone Asia/Kolkata
adduser --gecos '' deploy && usermod -aG sudo deploy
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy
fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab

ufw default deny incoming && ufw allow OpenSSH && ufw allow 80,443/tcp && ufw enable
sshd -t && systemctl restart ssh          # after editing sshd_config.d/
apt install -y fail2ban unattended-upgrades && systemctl enable --now fail2ban
```

### Daily operations

```bash
cd /srv/app
docker compose ps
docker compose logs -f --tail 100 api
docker compose exec db psql -U app
docker compose restart api
./deploy.sh <git-sha>

df -h && free -h && uptime
docker system df
ss -tulpn | grep -v 127.0.0.1              # what is public. Should be 22, 80, 443
journalctl -u docker -p err --since '1 hour ago'
```
