### The maintenance page

```nginx
location / {
    return 503;
    error_page 503 /maintenance.html;
}
```

- Worth having ready. A planned 503 with an explanation is a better outcome than an unplanned 502 with none
