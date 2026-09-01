## systemd

- Something has to start the process at boot, restart it when it crashes, and collect its output. On Linux that is **systemd**
- Running a service under `screen`, `nohup` or `pm2 start` on a server is how a service disappears after a reboot

```ini
# /etc/systemd/system/app.service
[Unit]
Description=Orders API
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=appuser
WorkingDirectory=/srv/app
EnvironmentFile=/etc/app.env
ExecStart=/usr/bin/node dist/index.js
Restart=always
RestartSec=2
KillSignal=SIGTERM
TimeoutStopSec=30
StandardOutput=journal
StandardError=journal
NoNewPrivileges=true
ProtectSystem=strict
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```
