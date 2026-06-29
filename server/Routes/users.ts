import express from 'express'
import * as userDb from '../db/users'
import { requireAuth } from '../middleware/auth'

const router = express.Router()

router.post('/', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id
    const username = req.body.username

    if (!username) {
      return res.status(400).json({ error: 'Username is required' })
    }

    const user = await userDb.createUser(userId, username)

    res.status(201).json(user)
  } catch (error) {
    console.error('Failed to create user:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/:id', async (req, res) => {
  const userId = req.params.id

  try {
    const user = await userDb.getUserById(userId)

    if (!user) {
      return res.status(404).json({ error: 'No user found' })
    }

    res.json(user)
  } catch (error) {
    console.error('Failed to fetch public profile:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router