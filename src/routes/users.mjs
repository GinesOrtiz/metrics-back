import express from 'express'

import { createUser, loginUser } from '../services/users.mjs'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  const [user, error] = await loginUser(username, password)

  if (error) {
    return res.status(401).json(error)
  }

  res.json(user)
})

router.post('/create', async (req, res) => {
  const { username, password } = req.body

  const [user, error] = await createUser(username, password)

  if (error) {
    return res.status(409).json(error)
  }

  res.json(user)
})

export default router
