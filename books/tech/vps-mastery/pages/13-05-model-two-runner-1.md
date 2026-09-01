## Model 2: a self-hosted runner

- The runner agent lives on the server and polls GitHub for jobs. No inbound SSH, no key in a secret

```bash
sudo useradd -m -s /bin/bash ghrunner
sudo usermod -aG docker ghrunner
sudo -u ghrunner -i

mkdir actions-runner && cd actions-runner
curl -o runner.tar.gz -L https://github.com/actions/runner/releases/latest/download/actions-runner-linux-x64.tar.gz
tar xzf runner.tar.gz
./config.sh --url https://github.com/kaleem/marketplace --token <REGISTRATION_TOKEN>
```

```bash
sudo ./svc.sh install ghrunner
sudo ./svc.sh start
```

```yaml
jobs:
  deploy:
    runs-on: self-hosted
```

### What it fixes

- The connection is outbound, so nothing new is exposed
- No long-lived SSH key stored at GitHub
- The workspace persists between runs, so the Docker layer cache actually survives

### What it does not fix

- **The build still happens on the production box.** Every problem on the previous page remains
