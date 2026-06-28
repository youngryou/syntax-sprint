import express from 'express'
import * as userDb from '../db/users'
import * as scoreDb from '../db/scores'

const router = express.Router()

// GET /api/v1/users/:id
router.get('/:id', async (req, res) => {
  const userId = req.params.id
  try {
    const user = await userDb.getUserById(userId)

    if (!user) {
      return res.status(404).json({ error: 'No user found' })
    }

    const publicProfile = {
      username: user.username,
      profileImage: user.profileImage,
      joinedAt: user.joinedAt,
    }

    res.json(publicProfile)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Failed to fetch public profile:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/:id/scores', async (req, res) => {
  try {
    const userId = req.params.id
    const scores = await scoreDb.getScoresByUserId(userId)

    res.json(scores)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Failed to fetch user scores:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
