export interface ScoreData {
  userId: string
  cpm: number
  accuracy: number
  points: number
  difficulty: string | null
}

export interface Score extends ScoreData {
  scoreId: string
  playedAt: string
}
