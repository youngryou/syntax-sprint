import express from 'express'
import * as Path from 'node:path'
import cors from 'cors'
import snippetRoutes from './Routes/snippet'
import scoreRoutes from './Routes/scores'
import userRoutes from './Routes/users'

const server = express()

server.use(cors({ origin: process.env.FRONTEND_URL }))

server.use(express.json())

server.use('/api/v1/snippets', snippetRoutes)
server.use('/api/v1/scores', scoreRoutes)
server.use('/api/v1/users', userRoutes)

// Health check endpoint
server.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok' })
})

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
