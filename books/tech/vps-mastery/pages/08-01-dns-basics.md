## Registrar, nameserver, resolver

- Three different things, often confused, and each can be the reason a domain does not work

| Role | Does | Examples |
|---|---|---|
| **Registrar** | Sells the lease on the name, holds the contact record | Namecheap, Porkbun, Cloudflare, GoDaddy |
| **Nameserver** | Answers questions about the name, holds the records | Cloudflare DNS, Route 53, the registrar's own |
| **Resolver** | Asks on behalf of a user and caches the answer | The user's ISP, 1.1.1.1, 8.8.8.8 |

- The registrar and the nameserver are often the same company and do not have to be. Moving DNS to a different provider means changing the nameserver records at the registrar

### A lookup, in order

1. The browser cache, then the operating system cache
2. The resolver, which answers from cache if it can
3. The root servers, which point at the `.com` servers
4. The `.com` servers, which point at your nameservers
5. Your nameservers, which give the address

- Only step 5 is under your control. Steps 1 to 3 are why a change is not instant

### The domain is a lease

- One to ten years, renewable. An expired domain stops resolving and enters a redemption period that costs far more to recover
- **Turn on auto-renew and keep the registrar contact email working.** A domain lost this way takes the site, the certificates and every email address with it
