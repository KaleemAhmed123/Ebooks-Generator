### Provision it from files, not from the UI

```yaml
# provisioning/datasources/all.yml
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    uid: prom
    url: http://prometheus:9090
    isDefault: true
  - name: Loki
    type: loki
    uid: loki
    url: http://loki:3100
    jsonData:
      derivedFields:
        - name: TraceID
          matcherRegex: '"traceId":"(\w+)"'
          url: '$${__value.raw}'
          datasourceUid: tempo
  - name: Tempo
    type: tempo
    uid: tempo
    url: http://tempo:3200
```

```yaml
# provisioning/dashboards/all.yml
apiVersion: 1
providers:
  - name: files
    type: file
    options: { path: /var/lib/grafana/dashboards, foldersFromFilesStructure: true }
```

- **A dashboard built in the UI and never exported is lost when the volume is.** Export the JSON and commit it
- **`derivedFields` is the line that connects logs to traces.** It turns `traceId` in a log line into a clickable link into Tempo, which is the single most useful thing in this whole module
