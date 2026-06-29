import express from 'express'
import { requireAuth } from '../middleware/auth'
import * as userDb from '../db/users'
import * as scoreDb from '../db/scores'

const router = express.Router()

//POST /api/v1/users
router.post('/', requireAuth, async (req, res) => {
  const userId = req.user?.id
  const { username, profileImage } = req.body

  if (!userId) {
    return res
      .status(401)
      .json({ error: 'Unuthorised: Missing user UUID from token' })
  }

  try {
    const existingUser = await userDb.getUserById(userId)
    if (existingUser) {
      return res.status(200).json({
        message: 'User already exists',
        user: {
          username: existingUser.username,
          profileImage: existingUser.profileImage,
          joinedAt: existingUser.joinedAt,
        },
      })
    }
    const newUser = await userDb.addUser({
      id: userId,
      username: username,
      profileImage: profileImage || null,
    })
    return res.status(201).json({
      message: 'profile creacted with success',
      user: {
        username: newUser.username,
        profileImage: newUser.profileImage,
        joinedAt: newUser.joinedAt,
      },
    })
  } catch (error: unknown) {
    console.error(
      'Failed to build user profile:',
      error instanceof Error ? error.message : String(error),
    )
    return res.status(500).json({ error: 'internal server error' })
  }
})

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

// GET /api/v1/users/:id/scores
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

// GET /api/v1/users/:id/stats
router.get('/:id/stats', async (req, res) => {
  try {
    const userId = req.params.id

    const stats = await scoreDb.getUserBestStats(userId)

    res.json(stats)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Failed to fetch user stats:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
