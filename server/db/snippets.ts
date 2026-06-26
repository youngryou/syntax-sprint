import { supabase } from '../supabaseClient'
import { Snippet } from '../../models/snippet'

const snippetData =
  'snippetId:snippet_id, language, codeText:code_text, logicHint:logic_hint, difficulty'

export async function getRandomSnippet(): Promise<Snippet | null> {
  const { data, error } = await supabase.from('snippets').select(snippetData)

  if (error) {
    throw new Error(`Supabase DB Error: ${error.message}`)
  }

  if (!data || data.length === 0) {
    return null
  }

  const randomIndex = Math.floor(Math.random() * data.length)

  return data[randomIndex] as Snippet
}
