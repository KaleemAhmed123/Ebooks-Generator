### Afterwards

- The site being back is not the end. These are the steps that are forgotten because the pressure is off

- [ ] Restart the backup timer, and confirm the **first run** completes
- [ ] Re-add every monitoring check and alert route
- [ ] Update anything still holding the old IP address: DNS, allowlists at payment or mail providers, any partner integration
- [ ] Re-issue the deploy key, and remove the old one from GitHub
- [ ] Rotate anything that was on the failed box and might have been exposed
- [ ] Confirm the certificate renewal timer is present and passes `--dry-run`
- [ ] Delete the failed server, once certain nothing is needed from it

### Record the incident while it is fresh

- Three sentences is enough: what failed, what was tried, what actually fixed it
- Add the elapsed time for each phase. That number is the real RTO, and it is more useful than any estimate

### Fix the script, not the memory

- Every step that needed improvisation is a gap in `bootstrap.sh` or in the runbook
- **Make the change the same day.** A recovery that worked because someone remembered something is a recovery that will fail when that person is unavailable

### Then schedule the next drill

- Page 16-07. The gap that was just found is evidence the drill works
