import mongoose from 'mongoose'
import MetricsModel from './src/models/metrics.mjs'
import UsersModel from './src/models/users.mjs'
import { createUser } from './src/services/users.mjs'
;(async () => {
  await UsersModel.collection.drop()
  await MetricsModel.collection.drop()

  const [user] = await createUser('username', 'password')

  const metrics = []
  const date = new Date()

  for (let i = 0; i < 100; i++) {
    const day = parseInt(Math.random() * 30)
    const hour = parseInt(Math.random() * 24)
    const minute = parseInt(Math.random() * 60)

    metrics.push({
      user: mongoose.Types.ObjectId(user._id),
      name: `Metric demo ${i}`,
      value: (Math.random() * 100).toFixed(0),
      createdAt: new Date(date.getFullYear(), date.getMonth(), day, hour, minute),
    })
  }

  await MetricsModel.create(metrics)

  process.exit()
})()
