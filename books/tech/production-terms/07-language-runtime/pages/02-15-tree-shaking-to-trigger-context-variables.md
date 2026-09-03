## Tree Shaking

The bundler dropping exports that nothing imports. It only works when the module
graph can be read statically, which means ES modules and no work happening at
import time.

`import { debounce } from 'lodash'` still ships the whole library, because
CommonJS resolves its exports at runtime and the bundler cannot prove the rest is
unused. `lodash-es`, or `import debounce from 'lodash/debounce'`, ships about 2KB.

| Module form | Resolution | Shakeable |
|---|---|---|
| `require()` — CommonJS | dynamic, at runtime | no |
| `import` — ES module | static, at build time | yes |

`"sideEffects": false` in `package.json` is what actually unlocks it. Without
that flag the bundler assumes importing a module does something, and keeps
modules whose exports are all unused.

## Trigger Context Variables

`Trigger.new`, `Trigger.old`, `Trigger.newMap`, `Trigger.oldMap`, and the
`isInsert` / `isUpdate` / `isDelete` flags. Which of them hold anything depends
on the operation that fired the trigger.

Reading `Trigger.old` during an insert throws a null reference — there is no
previous version of a record that did not exist. The same trigger runs fine on
update and dies the first time someone creates a record.

| Operation | `Trigger.new` | `Trigger.old` |
|---|---|---|
| insert | populated | null |
| update | populated | populated |
| delete | null | populated |

Guard each branch with the context flag. A trigger written for updates will be
fired on insert eventually, by a data load nobody told you about.
