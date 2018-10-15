// tslint:disable:variable-name
import { format } from 'date-fns'
import request from 'supertest'
import app from '../src/app'

const amount = 10
const src_currency = 'EUR'
const dest_currency = 'GBP'
const reference_date = format(new Date(), 'YYYY-MM-DD')

jest.mock('../src/rates', () => ({
  getRates: () => [{ currency: 'GBP', date: reference_date, rate: 0.88 }],
}))

describe('app', () => {
  describe('GET /convert', () => {
    it('should return status code 400 on missing amount', async () => {
      const query = { src_currency, dest_currency }
      const res = await request(app).get('/convert').query(query)
      expect(res.status).toBe(400)
      expect(res.body.errors[0].param).toBe('amount')
    })

    it('should return status code 400 on missing src_currency', async () => {
      const query = { amount, dest_currency }
      const res = await request(app).get('/convert').query(query)
      expect(res.status).toBe(400)
      expect(res.body.errors[0].param).toBe('src_currency')
    })

    it('should return status code 400 on missing dest_currency', async () => {
      const query = { amount, src_currency }
      const res = await request(app).get('/convert').query(query)
      expect(res.status).toBe(400)
      expect(res.body.errors[0].param).toBe('dest_currency')
    })

    it('should return status code 400 on malformed amount', async () => {
      const query = { amount: 'str', src_currency, dest_currency }
      const res = await request(app).get('/convert').query(query)
      expect(res.status).toBe(400)
      expect(res.body.errors[0].param).toBe('amount')
    })

    it('should return status code 400 on malformed src_currency', async () => {
      const query = { amount, src_currency: 'XX', dest_currency }
      const res = await request(app).get('/convert').query(query)
      expect(res.status).toBe(400)
      expect(res.body.errors[0].param).toBe('src_currency')
    })

    it('should return status code 400 on malformed dest_currency', async () => {
      const query = { amount, src_currency, dest_currency: 'XX' }
      const res = await request(app).get('/convert').query(query)
      expect(res.status).toBe(400)
      expect(res.body.errors[0].param).toBe('dest_currency')
    })

    it('should return status code 400 on malformed reference_date', async () => {
      const query = { amount, src_currency, dest_currency, reference_date: 'XXXX' }
      const res = await request(app).get('/convert').query(query)
      expect(res.status).toBe(400)
    })

    it('should return status code 400 on non existing currency', async () => {
      const query = { amount, src_currency: 'XXX', dest_currency, reference_date }
      const res = await request(app).get('/convert').query(query)
      expect(res.status).toBe(400)
    })

    it('should return 200 on valid query without reference_date', async () => {
      const query = { amount, src_currency, dest_currency }
      const res = await request(app).get('/convert').query(query)
      expect(res.status).toBe(200)
      expect(res.body.amount).toBeTruthy()
      expect(res.body.currency).toBeTruthy()
    })

    it('should return 200 on valid query with reference_date', async () => {
      const query = { amount, src_currency, dest_currency, reference_date }
      const res = await request(app).get('/convert').query(query)
      expect(res.status).toBe(200)
      expect(res.body.amount).toBeTruthy()
      expect(res.body.currency).toBeTruthy()
    })
  })
})
