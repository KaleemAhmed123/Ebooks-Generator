### Keep an inventory

Two things worth doing once a quarter, both cheap:

1. **List every third-party origin the page contacts.** The CSP report endpoint
   does this for free. Anything you cannot name an owner for gets removed.
2. **Check what each one can reach.** A chat widget does not need to run on the
   checkout page. A session recorder that captures form input on a page with
   card fields is a compliance incident waiting to be written up.

### The rule of thumb

| The script | Treat it as |
|---|---|
| Loads on every page from a third-party origin | the highest risk item in your frontend |
| Is a payment provider in an iframe | acceptable, the iframe is the isolation |
| Was added for a campaign that ended | delete it |
| Nobody on the team can name the owner of | delete it |
