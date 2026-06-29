import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createClient } from '@supabase/supabase-js'
import request from 'supertest'
import app from '../../server'
import { supabase } from '../../db/supabase'

const TEST_EMAIL = `integration-${Date.now()}@test.invalid`
const TEST_PASSWORD = 'Integration_Test_123!'
const TEST_USERNAME = `testuser_${Date.now()}`

describe('Auth integration: signup → POST /users → login → protected request', () => {
  let accessToken: string
  let testUserId: string

  beforeAll(async () => {
    const {
      data: { user },
      error: createErr,
    } = await supabase.auth.admin.createUser({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      email_confirm: true,
    })
    if (createErr || !user)
      throw new Error(`Setup failed (create user): ${createErr?.message}`)
    testUserId = user.id

    // Use a fresh client instance for sign-in so the server's service-role
    // singleton never gets a user session attached to it (which would cause
    // RLS to apply to subsequent DB calls from route handlers).
    const authClient = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )
    const {
      data: { session },
      error: signInErr,
    } = await authClient.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    })
    if (signInErr || !session)
      throw new Error(`Setup failed (sign in): ${signInErr?.message}`)
    accessToken = session.access_token
  }, 15000)

  afterAll(async () => {
    if (!testUserId) return
    await supabase.from('scores').delete().eq('user_id', testUserId)
    await supabase.from('users').delete().eq('id', testUserId)
    await supabase.auth.admin.deleteUser(testUserId)
  })

  it('rejects a request with no token with 401', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ username: TEST_USERNAME })
    expect(res.status).toBe(401)
  })

  it('POST /users creates a user row for the signed-up user', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ username: TEST_USERNAME, profileImage: null })
    expect(res.status).toBe(201)
    expect(res.body.user.username).toBe(TEST_USERNAME)
  })

  it('POST /users returns 200 if the user already exists', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ username: TEST_USERNAME })
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('User already exists')
  })

  it('POST /scores succeeds with the same user token', async () => {
    const res = await request(app)
      .post('/api/v1/scores')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ cpm: 80, accuracy: 95 })
    expect(res.status).toBe(200)
  })

  it('rejects POST /scores with an invalid token', async () => {
    const res = await request(app)
      .post('/api/v1/scores')
      .set('Authorization', 'Bearer not-a-real-token')
      .send({ cpm: 80, accuracy: 95 })
    expect(res.status).toBe(401)
  })
})
