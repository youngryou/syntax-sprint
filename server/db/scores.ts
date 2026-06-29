import { supabase } from './supabase'
import { LeaderboardEntry } from '../../models/scores'

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