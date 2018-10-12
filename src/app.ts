import express from 'express'
import morgan from 'morgan'
import { stream } from './logger'

const app = express()
app.use(morgan('combined', { stream }))

export default app
