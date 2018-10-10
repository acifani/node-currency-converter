import express from 'express'
import morgan from 'morgan'
import { default as logger, stream } from './logger'

const app = express()
app.use(morgan('combined', { stream }))

const port = 9393
app.listen(port, () => {
  logger.info(`Listening on port: ${port}`)
})
