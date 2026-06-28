export interface ScoreData {
  userId: string
  cpm: number
  accuracy: number
}

export interface Score extends ScoreData {
  scoreId: string
  playedAt: string
}
