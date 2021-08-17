import UserModel from '../models/users.mjs'
import { compare, encrypt } from './bcrypt.mjs'
import jwt from 'jsonwebtoken'

export const loginUser = async (username, password) => {
  const user = await UserModel.findOne({ username })

  if (user) {
    const matchingPassword = await compare(password, user.password)

    if (matchingPassword) {
      const userInfo = { username: user.username, _id: user._id }
      const token = jwt.sign(userInfo, process.env.SECRET)

      return [{ token, ...userInfo }, null]
    } else {
      return [null, { error: 'invalid_password' }]
    }
  } else {
    return [null, { error: 'invalid_user' }]
  }
}

export const createUser = async (username, password) => {
  const hashPassword = await encrypt(password)
  const user = await UserModel.create({
    username: username.toLowerCase(),
    password: hashPassword,
  }).catch(() => null)

  if (user) {
    const userInfo = { username: user.username, _id: user._id }
    const token = jwt.sign(userInfo, process.env.SECRET)

    return [{ token, ...userInfo }, null]
  } else {
    return [null, { error: 'already_exists' }]
  }
}

export const decode = (token) => jwt.verify(token, process.env.SECRET) && jwt.decode(token)
