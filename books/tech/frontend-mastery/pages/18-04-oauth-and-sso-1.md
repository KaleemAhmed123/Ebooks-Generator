## OAuth 2.0 and Single Sign-On (SSO)

Managing passwords is a massive liability. If your database is breached and you didn't hash and salt the passwords correctly (e.g., using `bcrypt` or `argon2`), you are responsible for exposing your users' credentials.

Because of this, modern applications often prefer to outsource authentication entirely using **OAuth 2.0** or **OpenID Connect (OIDC)**.

### How OAuth Works (The "Log in with Google" Flow)
OAuth is an authorization framework that allows a user to grant a third-party application access to their data without ever giving the application their password.

1. **The Request:** The user clicks "Log in with Google" on your frontend. Your app redirects the user's browser directly to Google's servers.
2. **The Consent:** Google asks the user: *"This app wants to access your email and profile picture. Do you allow this?"* The user logs into Google (if not already) and clicks "Allow." You never see this interaction.
3. **The Callback:** Google redirects the user's browser back to your application (e.g., to `https://yourapp.com/api/auth/callback`), and attaches a temporary `Authorization Code` to the URL.
4. **The Token Exchange:** Your frontend sends this code to your backend. Your backend secretly contacts Google server-to-server and says: *"Here is the code the user gave me, and here is my secret Client ID. Give me an Access Token."*
5. **The Access Token:** Google verifies the code and replies with an Access Token. Your backend can now use this token to fetch the user's email address from Google's API, create an account for them in your database, and log them in!

### Single Sign-On (SSO) in the Enterprise
In enterprise environments, employees do not want to memorize 50 different passwords for the HR portal, the ticketing system, and the chat app.

Companies use an Identity Provider (IdP) like Okta, Auth0, or Microsoft Entra ID. 
They implement **SSO (Single Sign-On)**. The architecture is almost identical to the OAuth flow described above. 

When an employee tries to access an internal app, they are immediately redirected to Okta. They log into Okta once in the morning. For the rest of the day, any app they visit simply redirects to Okta, Okta sees they are already logged in, and silently redirects them back with a token.
