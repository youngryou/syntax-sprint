import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseSRK = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error("Missing env var: 'supabaseUrl' is undefined.")
}

if (!supabaseSRK) {
  throw new Error("Missing env var: 'supabaseSRK' is undefined.")
}

export const supabase = createClient(supabaseUrl, supabaseSRK)
