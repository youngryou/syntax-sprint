import { LeaderboardEntry } from '../../models/scores'
import { Snippet } from '../../models/snippet'
import { User } from '../../models/user'
import { Score } from '../../models/score'
import { Stat } from '../../models/stat'
import { supabase } from './supabase'

const BASE_URL = '/api/v1'

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const response = await fetch(`${BASE_URL}/scores`)
  return response.json()
}

export async function getRandomSnippet(): Promise<Snippet> {
  const response = await fetch(`${BASE_URL}/snippets/random`)
  return response.json()
}

export async function getUserById(id: string): Promise<User> {
  const response = await fetch(`${BASE_URL}/users/${id}`)
  return response.json()
}

export async function getUserScores(id: string): Promise<Score[]> {
  const response = await fetch(`${BASE_URL}/users/${id}/scores`)
  return response.json()
}

export async function getUserStats(id: string): Promise<Stat> {
  const response = await fetch(`${BASE_URL}/users/${id}/stats`)
  return response.json()
}

export async function postScore(cpm: number, accuracy: number): Promise<void> {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token

  await fetch(`${BASE_URL}/scores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ cpm, accuracy }),
  })
}

export async function registerUser(username: string, profileImage: string | null): Promise<void> {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token

  await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username, profileImage }),
  })
}
