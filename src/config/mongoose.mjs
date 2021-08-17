import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connection = mongoose

connection
  .connect(process.env.MONGO_URL, {
    dbName: 'metrics',
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    poolSize: 30,
    socketTimeoutMS: 3600000,
    connectTimeoutMS: 3600000,
  })
  .catch((e) => console.log(e))

export default connection
