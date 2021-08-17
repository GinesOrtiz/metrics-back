import mongoose from 'mongoose'
import MetricsModel from '../models/metrics.mjs'

export const getMetrics = async (user) => {
  const metrics = (await MetricsModel.find({ user: user._id })) || []

  return [metrics, null]
}

export const createMetric = async (user, name, value) => {
  const metric = await MetricsModel.create({
    user: mongoose.Types.ObjectId(user._id),
    name,
    value,
  }).catch((e) => ({ error: e }))

  if (metric.error) {
    return [null, metric]
  }

  return [metric, null]
}

export const updateMetric = async (user, id, value) => {
  const metric = await MetricsModel.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(id),
      user: mongoose.Types.ObjectId(user._id),
    },
    { value },
    { new: true },
  ).catch((e) => ({ error: e }))

  if (metric.error) {
    return [null, metric]
  }

  return [metric, null]
}

export const deleteMetric = async (user, id) => {
  const metric = await MetricsModel.findOneAndDelete({
    _id: mongoose.Types.ObjectId(id),
    user: mongoose.Types.ObjectId(user._id),
  })

  if (!metric) {
    return [null, { error: 'not_found' }]
  }

  return [metric, null]
}
