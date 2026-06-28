import { supabase } from './supabase'
import { Score } from '../../models/score'

const scoreQuery =
  'scoreId:score_id, userId:user_id, cpm, accuracy, playedAt:played_at'

export async function getScoresByUserId(userId: string): Promise<Score[]> {
  const { data, error } = await supabase
    .from('scores')
    .select(scoreQuery)
    .eq('user_id', userId)
    .order('played_at', { ascending: false })

  if (error) {
    throw new Error(`Supabase DB Error: ${error.message}`)
  }

  if (!data || data.length === 0) {
    return []
  }

  return data as Score[]
}
