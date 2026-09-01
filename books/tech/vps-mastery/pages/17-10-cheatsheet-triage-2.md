### The order of escalation

1. Read the logs
2. Restart the one failing service
3. Roll back the last deploy
4. Restart the whole color
5. Restore from backup
6. Rebuild the box, Module 16

- **Work down the list.** Starting at step 5 for a problem solved by step 2 turns twenty minutes into three hours

### After it is over

- Write down what happened, what was tried, and what actually fixed it. Three sentences is enough
- Add one alert that would have caught it earlier, or delete one that did not help
