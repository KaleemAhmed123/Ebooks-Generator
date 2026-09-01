### Semantic release, the other approach

`semantic-release` derives the version from commit messages instead, using
Conventional Commits.

```
feat(ui): add loading state to Button       -> minor
fix(ui): correct focus ring offset          -> patch
feat(ui)!: rename variant prop to intent    -> major
```

| | Changesets | semantic-release |
|---|---|---|
| Intent declared | in a file, reviewed in the pull request | in the commit message |
| Multiple packages | designed for it | needs plugins and gets awkward |
| Changelog quality | written by a human for humans | generated from commit subjects |
| Can you fix a mistake before release | yes, edit the file | no, the commit is written |
| Fits | monorepos | a single package |

For a monorepo, Changesets. For one library in one repository, semantic-release
is less ceremony.
