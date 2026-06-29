import * as scoresDb from '../db/scores'
import express from 'express'
import { requireAuth } from '../middleware/auth'

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

// POST /api/v1/scores
router.post('/', requireAuth, async (req, res) => {
  try {
    const id = req.user!.id
    const cpm = req.body.cpm
    const accuracy = req.body.accuracy
    await scoresDb.addScore(id, cpm, accuracy)
    res.status(200).json('Score added to userID successfully.')
  } catch (error: any) {
    console.error('Failed to add score:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
