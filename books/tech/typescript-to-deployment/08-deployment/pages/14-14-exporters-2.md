## Exporters - continued

blackbox-exporter:
    image: prom/blackbox-exporter:v0.28
    volumes: ['./monitoring/blackbox.yml:/config/blackbox.yml:ro']
    command: ['--config.file=/config/blackbox.yml']
```

### Probing from outside, which is the one people skip

```yaml
  - job_name: blackbox
    metrics_path: /probe
    params: { module: [http_2xx] }
    static_configs: [{ targets: ['https://api.example.com/ready'] }]
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: blackbox-exporter:9115
```

- **`probe_ssl_earliest_cert_expiry` is the certificate expiry alarm** that Module 11 asks for, and it is free once blackbox is running
