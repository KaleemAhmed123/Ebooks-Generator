### Generating it

```bash
write_color_conf() {
  local color="$1"
  cat > /srv/app/edge/conf.d/active-color.conf <<CONF
upstream gateway { server api-gateway-${color}:8080; keepalive 64; }
upstream shop_ui { server shop-ui-${color}:3000;     keepalive 32; }
upstream seller_ui { server seller-ui-${color}:3001; keepalive 32; }
upstream admin_ui  { server admin-ui-${color}:3002;  keepalive 32; }
upstream chat    { server chat-${color}:6010;        keepalive 32; }
CONF
}
```

### Recording which color is live

```bash
echo "blue" > /srv/app/.active-color
CURRENT=$(cat /srv/app/.active-color)
NEXT=$([ "$CURRENT" = "blue" ] && echo green || echo blue)
```

- **The file is the source of truth**, not the Nginx config, and not memory. A script that infers the live color from `docker ps` gets it wrong the first time a container is left running
