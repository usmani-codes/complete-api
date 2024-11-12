import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

//routes
import postsRouter from './routes/posts.js'
import authRouter from './routes/authRouter.js'

// middlewares
import notFound from './middlewares/notFound.js'
import logger from './middlewares/logger.js'
import errorHandler from './middlewares/errorHandler.js'

//utils
import { connectDB } from './utils/connectDB.js'

const app = express()
const PORT = process.env.PORT || 3000
const api = process.env.API_URI

//middlewares
// app.use(express.static('public'))
app.use(cors())
app.use(cookieParser())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger)

// routers
app.use(`${api}/posts`, postsRouter)
app.use(`${api}/auth`, authRouter)

// middilewares
app.use(notFound)
app.use(errorHandler)

//run server
const runServer = async () => {
   try {
      await connectDB(process.env.MONGO_URI)
      console.log('connected to database ...')
      app.listen(PORT, async () => {
         console.log(`server is listening at http://localhost:${PORT}`)
      })
   } catch (error) {
      console.log("Couldn't connected to db ..", error.message)
   }
}


runServer()