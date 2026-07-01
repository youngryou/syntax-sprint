export const DIFFICULTY_MULTIPLIERS = {
  easy: 1,
  medium: 1.3,
  hard: 1.6,
} as const

export type Difficulty = keyof typeof DIFFICULTY_MULTIPLIERS

export function getDifficultyMultiplier(difficulty: string): number {
  return DIFFICULTY_MULTIPLIERS[difficulty as Difficulty] ?? 1
}
