import express from 'express'
import * as scoresDb from '../db/scores'

const router = express.Router()

// GET /api/v1/scores
router.get('/', async (req, res) => {
  try {
    const leaderboard = await scoresDb.getLeaderboard()
    res.json(leaderboard)
  } catch (error: any) {
    console.error('Failed to fetch leaderboard:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
