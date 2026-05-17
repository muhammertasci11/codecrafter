export interface LangContent {
  startingCode: string
  tests: string
  hint: string
}

export type LangContentMap = Record<string, LangContent>
