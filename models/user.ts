export interface UserData {
  username: string
  profileImage: string | null
}

export interface User extends UserData {
  userId: string
  joinedAt: string
}
