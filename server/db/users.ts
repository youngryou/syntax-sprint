import { supabase } from './supabase'
import { User, NewUser } from '../../models/user'

const userData =
  'userId:id, username, profileImage:profile_image, joinedAt:created_at'

export async function getUserById(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select(userData)
    .eq('id', userId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }
    throw new Error(`Supabase DB Error (getUserById): ${error.message}`)
  }
  return data as User
}

export async function addUser(newUser: NewUser): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        id: newUser.id,
        username: newUser.username,
        profile_image: newUser.profileImage,
      },
    ])
    .select(userData)
    .single()

  if (error) {
    throw new Error(`supabase DB Error (addUser): ${error.message}`)
  }
  return data as User
}
