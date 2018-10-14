import express, { Request, Response } from 'express'
import { query as check, validationResult } from 'express-validator/check'
import morgan from 'morgan'
import { convert } from './converter'
import { stream } from './logger'

const app = express()
app.use(morgan('combined', { stream }))

const validationRules = [
  check('amount')
    .not().isEmpty()
    .isFloat(),
  check(['src_currency', 'dest_currency'])
    .not().isEmpty()
    .isString()
    .isUppercase()
    .isLength({ min: 3, max: 3 }),
  check('reference_date')
    .optional()
    .isString()
    .matches(/\d{4}-\d{2}-\d{2}/),
]

app.get('/convert', validationRules, convertRoute)

function convertRoute(req: Request, res: Response) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array(), status: 400 })
    return
  }

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
