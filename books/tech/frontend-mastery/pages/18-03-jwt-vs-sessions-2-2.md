### Where should the Frontend store the JWT?
This is the most hotly debated topic in frontend security.
1. **LocalStorage:** Extremely vulnerable to XSS. Any malicious JavaScript on the page can easily read LocalStorage and steal the token. (Not Recommended).
2. **HttpOnly Cookie:** You tell the backend to send the JWT in an `HttpOnly` cookie. This hides the cookie from JavaScript entirely. XSS attacks cannot steal it. However, it makes you vulnerable to CSRF, requiring you to implement SameSite flags or CSRF tokens. (Industry Standard).
3. **In-Memory:** You store the JWT in a React state variable. It is immune to both XSS and CSRF. However, if the user refreshes the page, the state is wiped, and they are logged out unless you implement a silent Refresh Token rotation flow in the background. (Most Secure, Hardest to Implement).
