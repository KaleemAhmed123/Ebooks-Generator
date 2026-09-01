## sites-available and sites-enabled

- `sites-available` holds every site file. `sites-enabled` holds symlinks to the ones Nginx should read
- Turning a site off means removing a link, not deleting work

```bash
sudo nano /etc/nginx/sites-available/marketplace

sudo ln -s /etc/nginx/sites-available/marketplace \
           /etc/nginx/sites-enabled/marketplace

sudo nginx -t && sudo systemctl reload nginx
```

### Turning one off

```bash
sudo rm /etc/nginx/sites-enabled/marketplace
sudo nginx -t && sudo systemctl reload nginx
```

- The file in `sites-available` is untouched. Re-enabling is one `ln -s`

### Use absolute paths in the symlink

```bash
# breaks. A relative link resolves against sites-enabled, where the target is not
sudo ln -s ../sites-available/marketplace /etc/nginx/sites-enabled/

# works
sudo ln -s /etc/nginx/sites-available/marketplace /etc/nginx/sites-enabled/
```
