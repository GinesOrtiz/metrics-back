import bcrypt from 'bcryptjs'

const saltRounds = 10

export const encrypt = async (password) =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, function (saltError, salt) {
      if (saltError) {
        reject(saltError)
      } else {
        bcrypt.hash(password, salt, function (hashError, hash) {
          if (hashError) {
            reject(hashError)
          } else {
            resolve(hash)
          }
        })
      }
    })
  })

export const compare = async (password, hash) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (error, isMatch) {
      if (error) {
        reject(error)
      } else if (!isMatch) {
        reject(false)
      } else {
        resolve(true)
      }
    })
  })
