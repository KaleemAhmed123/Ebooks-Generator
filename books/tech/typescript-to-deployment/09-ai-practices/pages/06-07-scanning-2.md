### The two worth adding beyond the standard set

- **A new-dependency gate.** Any change to `package.json` requires a named reviewer. It is a one line CODEOWNERS entry and it stops slopsquatting cold
- **A diff size gate.** A pull request over some threshold warns and asks for a split. It protects review quality, which protects everything else

- **These run on every pull request, whoever opened it.** A gate that agent work skips is not a gate
