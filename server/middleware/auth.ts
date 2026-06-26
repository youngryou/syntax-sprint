import { Request, Response, NextFunction } from 'express'
import { supabase } from '../db/supabase'

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized Access: Missing token' })
  } else {
    const authToken = authHeader.split(' ')[1]
    const { data, error } = await supabase.auth.getUser(authToken)
    if (error) {
      return res
        .status(401)
        .json({ error: 'Unauthorized Access: Unverified token' })
    } else {
      req.user = data.user
      next()
    }
  }
}
