import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import users from './routes/users.mjs'
import metrics from './routes/metrics.mjs'
import { decode } from './services/users.mjs'

const app = express()

app.use(bodyParser.json({ type: 'application/json' }))
app.use(
  cors({
    origin: '*',
  }),
)

app.use('/user', users)

app.use((req, res, next) => {
  const authorization = req.header('authorization')

  if (authorization) {
    res.locals.user = decode(authorization)
    next()
  } else {
    return res.status(401).json({ error: 'auth_required' })
  }
})

app.use('/metrics', metrics)

app.listen(8080, () => console.log('Server ready at port 8080'))
