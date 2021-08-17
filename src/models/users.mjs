import mongoose from '../config/mongoose.mjs'

const User = {
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
}

const UserSchema = new mongoose.Schema(User, {
  timestamps: { createdAt: 'createdAt' },
})

UserSchema.index({ username: 1 })

export default mongoose.model('User', UserSchema)
