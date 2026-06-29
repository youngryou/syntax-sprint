export interface StatData {
  bestCpm: number
  averageAccuracy: number
}

export interface Stat extends StatData {
  userId: string
}
