import mongoose from '../config/mongoose.mjs'

const Metric = {
  name: String,
  value: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}

const MetricSchema = new mongoose.Schema(Metric, {
  timestamps: { createdAt: 'createdAt' },
})

MetricSchema.index({ user: 1 })

export default mongoose.model('Metric', MetricSchema)
