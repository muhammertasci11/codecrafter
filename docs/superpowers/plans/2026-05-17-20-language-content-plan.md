# 20 Language Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add complete startingCode, tests, and hints for all 20 languages to every challenge (18) and boss stage (18).

**Architecture:** Each language gets a dedicated file under `src/lib/challenges/<lang>.ts` exporting `Record<string, LangContent>`. A merge script (`index.ts`) injects all language data into the CHALLENGES object and SECTIONS boss stages at module load time.

**Tech Stack:** TypeScript, Next.js

---

### Task 1: Create type and merge infrastructure

**Files:**
- Create: `src/lib/challenges/types.ts`
- Create: `src/lib/challenges/index.ts`

- [ ] **Step 1: Create types.ts**

```ts
export interface LangContent {
  startingCode: string
  tests: string
  hint: string
}

export type LangContentMap = Record<string, LangContent>
```

- [ ] **Step 2: Create index.ts**

```ts
import { LangContent } from './types'
import { PYTHON } from './python'
import { JAVA } from './java'
import { CPP } from './cpp'
import { C_LANG } from './c'
import { GO } from './go'
import { RUST } from './rust'
import { KOTLIN } from './kotlin'
import { SWIFT } from './swift'
import { TYPESCRIPT } from './typescript'
import { CSHARP } from './csharp'
import { PHP } from './php'
import { RUBY } from './ruby'
import { SCALA } from './scala'
import { DART } from './dart'
import { R_LANG } from './r'
import { HASKELL } from './haskell'
import { LUA } from './lua'
import { PERL } from './perl'
import { JULIA } from './julia'

export interface MergedLangContent {
  python?: LangContent
  java?: LangContent
  cpp?: LangContent
  c?: LangContent
  go?: LangContent
  rust?: LangContent
  kotlin?: LangContent
  swift?: LangContent
  typescript?: LangContent
  csharp?: LangContent
  php?: LangContent
  ruby?: LangContent
  scala?: LangContent
  dart?: LangContent
  r?: LangContent
  haskell?: LangContent
  lua?: LangContent
  perl?: LangContent
  julia?: LangContent
}

const ALL_LANG_DATA: Record<string, [LangContentMap, string][]> = {
  python: [PYTHON, 'python'],
  java: [JAVA, 'java'],
  cpp: [CPP, 'cpp'],
  c: [C_LANG, 'c'],
  go: [GO, 'go'],
  rust: [RUST, 'rust'],
  kotlin: [KOTLIN, 'kotlin'],
  swift: [SWIFT, 'swift'],
  typescript: [TYPESCRIPT, 'typescript'],
  csharp: [CSHARP, 'csharp'],
  php: [PHP, 'php'],
  ruby: [RUBY, 'ruby'],
  scala: [SCALA, 'scala'],
  dart: [DART, 'dart'],
  r: [R_LANG, 'r'],
  haskell: [HASKELL, 'haskell'],
  lua: [LUA, 'lua'],
  perl: [PERL, 'perl'],
  julia: [JULIA, 'julia'],
}

export function mergeLangData<T extends Record<string, any>>(obj: T, id: string, target: any): void {
  for (const [langMap, langKey] of Object.values(ALL_LANG_DATA)) {
    if (langMap[id]) {
      target[langKey] = langMap[id]
    }
  }
}

export function mergeBossStages(stages: any[], bossId: string): void {
  stages.forEach((stage, i) => {
    const key = `${bossId}-${i}`
    for (const [langMap, langKey] of Object.values(ALL_LANG_DATA)) {
      if (langMap[key]) {
        stage[langKey] = langMap[key]
      }
    }
  })
}

export function buildFullLangData(baseId: string): MergedLangContent {
  const result: MergedLangContent = {}
  for (const [langMap, langKey] of Object.values(ALL_LANG_DATA)) {
    if (langMap[baseId]) {
      ;(result as any)[langKey] = langMap[baseId]
    }
  }
  return result
}
```

---

### Task 2: Move Python content to separate file

**Files:**
- Create: `src/lib/challenges/python.ts`

- [ ] **Step 1: Create python.ts with ALL challenge content**

Extract ALL inline `python` blocks from gameData.ts (both challenges and boss stages) into:

```
src/lib/challenges/python.ts
```

Keys: challenge IDs (e.g., `basics-1`) and boss-stage keys (e.g., `boss-basics-0`, `boss-basics-1`, `boss-basics-2`).

Export `PYTHON: LangContentMap`.

- [ ] **Step 2: Create java.ts with ALL challenge content**

Same structure as python.ts.

Export `JAVA: LangContentMap`.

---

### Task 3: Generate remaining 17 language content files (parallel agent swarm)

**Files:**
- Create: `src/lib/challenges/cpp.ts`
- Create: `src/lib/challenges/c.ts`
- Create: `src/lib/challenges/go.ts`
- Create: `src/lib/challenges/rust.ts`
- Create: `src/lib/challenges/kotlin.ts`
- Create: `src/lib/challenges/swift.ts`
- Create: `src/lib/challenges/typescript.ts`
- Create: `src/lib/challenges/csharp.ts`
- Create: `src/lib/challenges/php.ts`
- Create: `src/lib/challenges/ruby.ts`
- Create: `src/lib/challenges/scala.ts`
- Create: `src/lib/challenges/dart.ts`
- Create: `src/lib/challenges/r.ts`
- Create: `src/lib/challenges/haskell.ts`
- Create: `src/lib/challenges/lua.ts`
- Create: `src/lib/challenges/perl.ts`
- Create: `src/lib/challenges/julia.ts`

- [ ] **Step 1: Generate C++ content**

File exports `CPP: LangContentMap` with keys:
- `basics-1` through `es6-3` (18 challenge keys)
- `boss-basics-0` through `boss-es6-2` (18 boss stage keys)

Each entry: `{ startingCode: string, tests: string, hint: string }`

Pattern for challenges:
```ts
'basics-1': {
  startingCode: '#include <iostream>\n#include <string>\n\nint main() {\n  // Variables\n  return 0;\n}\n',
  tests: '// assertion checks',
  hint: '// solution code',
}
```

Pattern for boss stages: follow the existing inline `python`/`java` block pattern.

- [ ] **Step 2: Generate C content** — same structure as C++ but using C syntax (no classes, stdio.h)

- [ ] **Step 3: Generate Go content** — Go package main with func main()

- [ ] **Step 4: Generate Rust content** — fn main() with println!

- [ ] **Step 5: Generate Kotlin content** — fun main()

- [ ] **Step 6: Generate Swift content** — import Foundation, func

- [ ] **Step 7: Generate TypeScript content** — JS + types (or fallback to JS)

- [ ] **Step 8: Generate C# content** — class Program { static void Main }

- [ ] **Step 9: Generate PHP content** — <?php function

- [ ] **Step 10: Generate Ruby content** — def method

- [ ] **Step 11: Generate Scala content** — object Main extends App

- [ ] **Step 12: Generate Dart content** — void main()

- [ ] **Step 13: Generate R content** — function() syntax

- [ ] **Step 14: Generate Haskell content** — module Main where

- [ ] **Step 15: Generate Lua content** — function syntax

- [ ] **Step 16: Generate Perl content** — sub syntax

- [ ] **Step 17: Generate Julia content** — function syntax

---

### Task 4: Update gameData.ts to use merge

**Files:**
- Modify: `src/lib/gameData.ts`

- [ ] **Step 1: Remove all inline `python` and `java` fields from challenges and boss stages**

Delete every `python: { ... }` and `java: { ... }` block from CHALLENGES and SECTIONS.

- [ ] **Step 2: Add merge function calls**

At the bottom of gameData.ts (before exports), add:

```ts
import { mergeBossStages } from './challenges/index'

// Merge language data into all bosses
SECTIONS.forEach(s => {
  if (s.boss) {
    mergeBossStages(s.boss.stages, s.boss.id)
  }
})
```

For challenges, language data gets merged via `buildFullLangData()` call when the challenge object is accessed, OR challenges can be augmented in-place at the definition level. Since challenges are defined as a const object, we can augment them in a post-definition loop:

```ts
import { buildFullLangData } from './challenges/index'

for (const id of Object.keys(CHALLENGES)) {
  const langData = buildFullLangData(id)
  Object.assign(CHALLENGES[id], langData)
}
```

---

### Task 5: Build and verify

- [ ] **Step 1: Run build**

```bash
npm run build
```

Expected: `Compiled successfully` with 0 errors, 0 warnings.

- [ ] **Step 2: Fix any type errors**

The `Challenge` type needs to accept additional language fields. Add `[key: string]: any` or extend the type definition to include the 20 language keys.
