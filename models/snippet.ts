export interface SnippetData {
  language: string
  codeText: string
  logicHint: string | null
  difficulty: string
}

export interface Snippet extends SnippetData {
  snippetId: string
}
