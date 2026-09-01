### Email is separate

- `MX` records point at a mail provider, not at this box. Running a mail server on a VPS is a different job with its own deliverability problems

```text
MX    @    10 mx1.provider.example    3600
TXT   @    "v=spf1 include:provider.example ~all"
```

### CAA, if the registrar supports it

```text
CAA   @    0 issue "letsencrypt.org"
```

- Declares that only Let's Encrypt may issue certificates for this domain
