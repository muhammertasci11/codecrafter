import type { LangContent, LangContentMap } from './types'
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
import { PYTHON } from './python'
import { JAVA } from './java'
import { SQL } from './sql'
import { BASH } from './bash'
import { HTML } from './html'
import { CSS_LANG } from './css'

type LangEntry = [LangContentMap, string]

const LANG_MODULES: LangEntry[] = [
  [CPP, 'cpp'],
  [C_LANG, 'c'],
  [GO, 'go'],
  [RUST, 'rust'],
  [KOTLIN, 'kotlin'],
  [SWIFT, 'swift'],
  [TYPESCRIPT, 'typescript'],
  [CSHARP, 'csharp'],
  [PHP, 'php'],
  [RUBY, 'ruby'],
  [SCALA, 'scala'],
  [DART, 'dart'],
  [R_LANG, 'r'],
  [HASKELL, 'haskell'],
  [LUA, 'lua'],
  [PERL, 'perl'],
  [JULIA, 'julia'],
  [PYTHON, 'python'],
  [JAVA, 'java'],
  [SQL, 'sql'],
  [BASH, 'bash'],
  [HTML, 'html'],
  [CSS_LANG, 'css'],
]

export function injectLangData(target: Record<string, any>, id: string): void {
  for (const [map, langKey] of LANG_MODULES) {
    if (map[id]) {
      target[langKey] = map[id]
    }
  }
}

export function injectBossStageLangData(stages: { [key: string]: any }[], bossId: string): void {
  stages.forEach((stage, i) => {
    const key = `${bossId}-${i}`
    for (const [map, langKey] of LANG_MODULES) {
      if (map[key]) {
        stage[langKey] = map[key]
      }
    }
  })
}
