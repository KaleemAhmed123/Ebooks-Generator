## Installing Nginx

```bash
sudo apt update
sudo apt install -y nginx
sudo systemctl enable --now nginx
nginx -v
# nginx version: nginx/1.28.x
```

- Visiting the server IP now returns the default page. That confirms the firewall rule from page 02-08 and nothing more

### Port 80 must be free

- If Apache was installed by a provider image, Nginx will not start:

```text
nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
```

```bash
sudo ss -tulpn | grep ':80 '
sudo systemctl disable --now apache2
```

- **Stop the service, do not kill the process.** A killed process is restarted by systemd and the port is taken again

### Remove the default site

```bash
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

- Leaving it in place means any hostname pointed at the server IP gets the welcome page, which is how a site ends up serving the wrong content on the wrong domain

### The user Nginx runs as

```bash
ps aux | grep nginx
# root      812  nginx: master process
# www-data  813  nginx: worker process
```

- The master binds port 80 as root, then drops to `www-data` for the workers. Static files Nginx serves directly must be readable by `www-data`
