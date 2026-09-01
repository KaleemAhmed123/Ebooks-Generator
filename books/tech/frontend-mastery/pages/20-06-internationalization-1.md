## Internationalization

Internationalization, abbreviated **i18n** because there are eighteen letters between the first and last, is building an app that can be translated. Localization, **l10n**, is doing the translating. The first is engineering work and the second is not, which is why the two are separate words.

Retrofitting i18n into a shipped app is one of the most expensive refactors there is, because every hardcoded string, every date format, and every layout assumption has to be found by hand.

### The part that is not translation

Translation is the visible half. These are the ones that produce bugs.

**Plurals are not a ternary.** English has two forms. Arabic has six. Polish has different forms for 2 to 4 and for 5 or more. `count === 1 ? 'item' : 'items'` is a rule that only holds in one language.

```ts
const rules = new Intl.PluralRules('pl-PL');
rules.select(1);    // 'one'
rules.select(3);    // 'few'
rules.select(7);    // 'many'
```

**Sentence order changes.** Never build a sentence by concatenating fragments. "Deleted %d files from %s" has a fixed word order in English and a different one in Japanese. The whole sentence must be one translatable unit with named placeholders.

```ts
// Wrong: the translator receives three fragments and no context
t('deleted') + ' ' + count + ' ' + t('files')

// Right: one string, placeholders the translator can move
t('files.deleted', { count, folder })
```

**Text expands.** German runs 30% longer than English on average, and a single word can be far worse. A button sized to fit "Save" clips "Speichern". Design for the longest language, not the shortest, and never fix a width in pixels to a piece of text.
