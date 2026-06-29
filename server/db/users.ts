import { supabase } from './supabase'
import { User } from '../../models/user'

export async function getUserById(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('userId:user_id, username, profileImage:profile_image, joinedAt:joined_at')
    .eq('user_id', userId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw new Error(`Supabase DB Error: ${error.message}`)
  }

  return data as User
}
