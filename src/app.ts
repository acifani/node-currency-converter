import express, { Request, Response } from 'express'
import { query as check, validationResult } from 'express-validator/check'
import morgan from 'morgan'
import { convert } from './converter'
import { stream } from './logger'

const app = express()
app.use(morgan('combined', { stream }))

app.get('/convert', convertRoute)

function convertRoute(req: Request, res: Response) {
  const amount = req.query.amount
  const sourceCurrency = req.query.src_currency
  const destCurrency = req.query.dest_currency
  const date = req.query.reference_date

  try {
    const result = convert(amount, sourceCurrency, destCurrency, date)
    res.status(200).send(result)
  } catch (e) {
    res.status(400).send({ errors: [{ msg: e.message }], status: 400 })
  }
}

export default app
