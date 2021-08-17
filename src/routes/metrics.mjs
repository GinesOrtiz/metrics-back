import express from 'express'
import { createMetric, deleteMetric, getMetrics, updateMetric } from '../services/metrics.mjs'

const router = express.Router()

router.get('/', async (req, res) => {
  const [metrics, error] = await getMetrics(res.locals.user)

  if (error) {
    return res.status(409).json(error)
  }

  res.json(metrics)
})

router.post('/', async (req, res) => {
  const { name, value } = req.body
  const [metrics, error] = await createMetric(res.locals.user, name, value)

  if (error) {
    return res.status(409).json(error)
  }

  res.json(metrics)
})

router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const value = req.body.value
  const [metrics, error] = await updateMetric(res.locals.user, id, value)

  if (error) {
    return res.status(404).json(error)
  }

  res.json(metrics)
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const [metrics, error] = await deleteMetric(res.locals.user, id)

  if (error) {
    return res.status(404).json(error)
  }

  res.json(metrics)
})

export default router
