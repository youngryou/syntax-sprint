import { supabase } from './supabase'
import { Score } from '../../models/score'
import { StatData } from '../../models/stat'
import { LeaderboardEntry } from '../../models/scores'

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

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from('scores')
    .select('cpm, accuracy, played_at, users!inner(username)')
    .order('cpm', { ascending: false })

  if (error) {
    throw new Error(`Supabase DB Error: ${error.message}`)
  }

  if (!data || data.length === 0) {
    return []
  }

  const bestPerUser = new Map<string, LeaderboardEntry>()

  for (const row of data) {
    const username = (row.users as unknown as { username: string }).username
    if (!bestPerUser.has(username)) {
      bestPerUser.set(username, {
        rank: 0,
        username,
        bestCpm: row.cpm,
        accuracy: row.accuracy,
        playedAt: row.played_at,
      })
    }
  }

  return Array.from(bestPerUser.values())
    .slice(0, 10)
    .map((entry, i) => ({ ...entry, rank: i + 1 }))
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

export async function addScore(user_id: string, cpm: number, accuracy: number) {
  const { error } = await supabase
    .from('scores')
    .insert({ user_id, cpm, accuracy })
  if (error) {
    throw new Error(`Supabase DB Error: ${error.message}`)
  }
}
