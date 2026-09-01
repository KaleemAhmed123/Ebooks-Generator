## The first hour

- Do these in order, before installing anything. Each page in this module covers one line

| # | Step | Page |
|---|---|---|
| 1 | Update every package | 02-02 |
| 2 | Turn on automatic security updates | 02-02 |
| 3 | Create a non-root user with sudo | 02-03 |
| 4 | Put an SSH key on that user | 02-04 |
| 5 | Disable root login and password login | 02-05 |
| 6 | Install fail2ban | 02-07 |
| 7 | Enable the firewall | 02-08 |
| 8 | Close the hole Docker opens in it | 02-09, 02-10 |
| 9 | Add a swap file | 02-11 |
| 10 | Set hostname and timezone | 02-12 |

### The rule that prevents the worst outcome

- **Never close the current SSH session while changing SSH configuration.** Open a second terminal and prove the new setup works before letting go of the working one
- Getting this wrong means the recovery console, and the recovery console is always worse than it looks

### Time

- Fifteen minutes by hand. Module 16 turns the whole list into one script that runs in under two minutes, because a rebuild has to be fast
