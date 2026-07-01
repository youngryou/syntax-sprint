export interface LeaderboardEntry {
    rank: number
    username: string
    bestCpm: number
    points: number
    difficulty: string | null
    accuracy: number
    playedAt: string
}