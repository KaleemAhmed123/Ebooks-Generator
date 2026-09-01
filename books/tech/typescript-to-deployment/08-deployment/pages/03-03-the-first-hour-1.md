## The first hour

- A fresh box with a public address is **scanned within minutes**. The log will show login attempts before you have finished reading this page
- These steps are the difference between a server and a server that stays yours. Do them before anything else

```bash
ssh root@203.0.113.10

# 1. know what you are on
cat /etc/os-release && uname -m && nproc && free -h && df -h

# 2. update everything
apt update && apt full-upgrade -y && apt autoremove -y

# 3. hostname and time
hostnamectl set-hostname orders-prod
timedatectl set-timezone Asia/Kolkata
timedatectl                       # confirm NTP is synchronised

# 4. a real user, not root
adduser --gecos '' deploy
usermod -aG sudo deploy
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy

# 5. swap, so an out-of-memory spike does not kill the box
fallocate -l 2G /swapfile && chmod 600 /swapfile
mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
sysctl -w vm.swappiness=10 && echo 'vm.swappiness=10' >> /etc/sysctl.conf
```
