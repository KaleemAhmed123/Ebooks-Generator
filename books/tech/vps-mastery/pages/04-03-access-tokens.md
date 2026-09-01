## Personal access tokens

- Needed when cloning over HTTPS instead of SSH, and when a script talks to the GitHub API
- GitHub removed password authentication for Git operations. A token takes its place

### Fine-grained, not classic

| | Classic token | Fine-grained token |
|---|---|---|
| Scope | Every repository the account can reach | Named repositories only |
| Permissions | Coarse (`repo` covers read and write) | Per permission (Contents: read-only) |
| Expiry | Optional | Required |
| Use | Legacy only | The default choice |

- Create at **Settings, Developer settings, Personal access tokens, Fine-grained tokens**
- Select the single repository. Set **Contents: Read-only**. Set the shortest expiry that is workable
- The token is shown once. There is no way to read it again

### Using one

```bash
git clone https://github.com/kaleem/marketplace.git
# Username: kaleem
# Password: <paste the token>
```

### Do not store it in the remote URL

```bash
# wrong. The token is now in .git/config in plain text, and in every log line
git remote add origin https://TOKEN@github.com/kaleem/marketplace.git
```

- Use a credential helper, or use a deploy key instead

### For a server, prefer a deploy key

- It is repository-scoped, does not expire, and cannot be pasted into a chat window by accident
