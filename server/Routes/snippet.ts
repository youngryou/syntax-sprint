import express from 'express'
import * as snippetDb from '../db/snippets'

const router = express.Router()

// GET /api/v1/snippets/random
router.get('/random', async (req, res) => {
  try {
    const snippet = await snippetDb.getRandomSnippet()

    if (!snippet) {
      return res.status(404).json({ error: 'No snippets found.' })
    }

    res.json(snippet)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Failed to fetch random snippet:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
