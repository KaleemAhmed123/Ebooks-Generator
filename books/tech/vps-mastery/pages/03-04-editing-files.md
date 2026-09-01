## Editing files on the box

- There is no editor window. `nano` is the one worth learning first

```bash
sudo nano /etc/nginx/sites-available/marketplace
```

| Key | Does |
|---|---|
| `Ctrl+O` then Enter | Save |
| `Ctrl+X` | Exit |
| `Ctrl+W` | Search |
| `Ctrl+K` | Cut the current line |
| `Ctrl+U` | Paste it back |
| `Alt+U` | Undo |

- The mouse does nothing. Arrow keys move the cursor

### Writing a whole file without an editor

- Useful in scripts and in this booklet's cheatsheets

```bash
sudo tee /etc/sysctl.d/99-swap.conf > /dev/null <<'CONF'
vm.swappiness=10
CONF
```

- The quoted `<<'CONF'` marker stops the shell from expanding anything inside. Without the quotes, `$HOME` and backticks get substituted

### The rule for a production box

- **Do not edit application code on the server.** The next `git pull` will conflict, or the next image build will overwrite it, and the running version stops matching the repository
- Configuration that only exists on the box (`.env`, Nginx site files) is the exception. Keep a copy of those off the box, as Module 16 requires
