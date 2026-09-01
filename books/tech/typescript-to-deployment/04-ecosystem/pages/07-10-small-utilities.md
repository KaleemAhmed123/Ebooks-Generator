## Small utilities

- These need no explanation beyond what they do. Each removes a few dozen lines you would otherwise write badly

| Package | Version | What it does |
|---|---|---|
| `libphonenumber-js` | 1.x | parses and validates a phone number per country, and normalizes it to E.164 |
| `zxcvbn` | 4.x | scores password strength by how a real cracker would attack it, not by counting symbols |
| `ua-parser-js` | 2.x | browser, engine, OS and device from a user agent string |
| `picocolors` | 1.1.1 | terminal color in a fraction of chalk's size |
| `consola` | 3.4.2 | CLI logging with levels and readable output |
| `slugify` | 1.x | url-safe slugs that handle accents and non-Latin scripts |
| `mime` | 4.x | content type from a filename, and back again |

### Two rules about small packages

- **Check Node first.** `fetch`, `structuredClone`, `randomUUID`, `parseArgs` and `glob` all replaced popular packages
- **Check what a dependency already gives you.** Installing a date library when your ORM already ships one is two date libraries in the bundle

### Do not install

- `lodash` for `map`, `filter`, `groupBy` or `cloneDeep`. The language and `structuredClone` cover all of it
- `moment`. In maintenance mode, mutable, and roughly ten times the size of the alternatives
- `request`. Deprecated since 2020
