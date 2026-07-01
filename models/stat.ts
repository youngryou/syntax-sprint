export interface StatData {
  bestCpm: number
  averageAccuracy: number
  bestPoints: number
}

export interface Stat extends StatData {
  userId: string
}
