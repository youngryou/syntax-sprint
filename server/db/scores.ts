import { supabase } from './supabase'
import { Score } from '../../models/score'
import { StatData } from '../../models/stat'

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

export async function getUserBestStats(userId: string): Promise<StatData> {
  const { data, error } = await supabase
    .from('scores')
    .select('cpm, accuracy')
    .eq('user_id', userId)

  if (error) {
    throw new Error(`Supabase DB Error: ${error.message}`)
  }

  if (!data || data.length === 0) {
    return { bestCpm: 0, averageAccuracy: 0 }
  }

  const bestCpm = Math.max(...data.map((score) => Number(score.cpm)))

  const totalAccuracy = data.reduce(
    (sum, score) => sum + Number(score.accuracy),
    0,
  )

  const averageAccuracy = Number((totalAccuracy / data.length).toFixed(2))

  return { bestCpm, averageAccuracy } as StatData
}
