# 20 Language Content — Design

## Goal
Add starting code, tests, and hints for all 20 programming languages to every challenge (18) and boss stage (18) in CodeCrafter. Currently Python and Java are inline; 17 more languages need content.

## Architecture

### File Layout
```
src/lib/challenges/
  python.ts      ─┐
  java.ts        ─┤
  cpp.ts         ─┤
  c.ts           ─┤
  go.ts          ─┤
  rust.ts        ─┤
  kotlin.ts      ─┤
  swift.ts       ─┤
  php.ts         ─┤
  ruby.ts        ─┤
  scala.ts       ─┤
  dart.ts        ─┤
  r.ts           ─┤
  haskell.ts     ─┤
  lua.ts         ─┤
  perl.ts        ─┤
  julia.ts       ─┘  Each exports:
                        type LangContent = { startingCode: string; tests: string; hint: string }
                        Record<string, LangContent>
                        Keys: challengeId (e.g. "basics-1")
                              boss stage key (e.g. "boss-basics-0", "boss-basics-1", "boss-basics-2")
  index.ts          Imports all language modules, merges into CHALLENGES and SECTIONS
```

### Merge Strategy
A post-definition loop in `challenges/index.ts` merges each language's data into the CHALLENGES object and SECTIONS boss stages:

```ts
import { CPP } from './cpp'
// ... all languages

for (const [id, ch] of Object.entries(CHALLENGES)) {
  const data: Record<string, LangContent | undefined> = {
    cpp: CPP[id],
    // ... all
  }
  for (const [lang, content] of Object.entries(data)) {
    if (content) (ch as any)[lang] = content
  }
}
```

Boss stages use synthetic keys: `"boss-{sectionId}-{index}"`.

### Language List
Full (runnable): javascript, python, java, cpp, c, go, rust, kotlin, swift
Partial (code available): typescript, csharp, php, ruby, scala, dart, r, haskell, lua, perl, julia

### TypeScript Type
```ts
interface LangContent {
  startingCode: string
  tests: string
  hint: string
}
```

### gameData.ts Changes
- Remove inline `python` and `java` fields from challenges and boss stages (moved to their own files)
- Import and call `mergeAllLanguages()` from `./challenges/index`
- Keep JS base content as-is

## Scope
- 18 challenges × 17 new languages = 306 entries
- 18 boss stages × 17 new languages = 306 entries
- Total: ~612 code block sets
- Each entry: starting code skeleton, runnable test assertions, hint (solution)
