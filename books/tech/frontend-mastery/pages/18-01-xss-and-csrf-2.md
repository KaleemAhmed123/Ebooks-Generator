### Cross-Site Request Forgery (CSRF)

CSRF forces an end user to execute unwanted actions on a web application in which they are currently authenticated.

**The Attack:**
1. A user logs into `bank.com`. The browser saves their authentication cookie.
2. The user visits a malicious forum, `evil.com`.
3. `evil.com` contains a hidden image tag: `<img src="https://bank.com/transfer?amount=1000&to=attacker" />`.
4. When the browser tries to load the image, it sends a GET request to `bank.com`. Because the browser automatically attaches all `bank.com` cookies to requests targeting `bank.com`, the bank sees a valid, authenticated request and executes the transfer.

**The Defense:**
1. **SameSite Cookies:** Modern browsers support the `SameSite` attribute for cookies. Setting `SameSite=Lax` or `SameSite=Strict` tells the browser: "Do not attach this cookie if the request is originating from a different domain (like `evil.com`)." This effectively neutralizes standard CSRF.
2. **CSRF Tokens:** The server sends a unique, randomized string (a token) to the frontend. The frontend must include this exact token in the body or header of every POST request. `evil.com` cannot read the token because of the Same-Origin Policy, so its forged requests will fail validation.
3. **Using JWTs in Headers:** If you store your authentication token in Memory and attach it manually via the `Authorization: Bearer <token>` header (instead of using cookies), you are completely immune to CSRF, because browsers do not automatically attach headers to cross-origin image or form requests.
