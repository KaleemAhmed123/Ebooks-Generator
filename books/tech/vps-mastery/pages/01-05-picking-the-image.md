## Picking the operating system image

- Choose **Ubuntu LTS**. It has the longest documentation trail, and every tool in this booklet ships packages for it

| Release | Released | Standard support until |
|---|---|---|
| Ubuntu 24.04 LTS "Noble Numbat" | April 2024 | April 2029 |
| Ubuntu 26.04 LTS "Resolute Raccoon" | April 2026 | April 2031 |

- **26.04 LTS is the default for a new box.** Newer kernel, newer OpenSSL, five years of support ahead of it
- **24.04 LTS is the safe pick** when a dependency has not been tested on 26.04. It still has years left

### What not to pick

- A non-LTS release. Nine months of support means a forced rebuild inside a year
- A provider "app image" with Docker or a control panel preinstalled. It hides configuration that has to be understood later, and pins versions nobody chose
- Anything outside the Debian family, unless there is a specific reason. Every command here assumes `apt`

:::note
Debian works everywhere Ubuntu does in this booklet, with two differences: `sudo` is not installed by default, and `ufw` must be installed explicitly.
:::
