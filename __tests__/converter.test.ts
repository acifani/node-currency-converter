import { addDays, format } from 'date-fns'
import { convert, getRateAtDate } from '../src/converter'

const EUR = 'EUR'
const GBP = 'GBP'
const today = new Date()
const dateFormat = 'YYYY-MM-DD'
const formattedToday = format(today, dateFormat)
const anotherDate = format(addDays(formattedToday, -3), dateFormat)
const todayRate = 0.8764
const anotherDateRate = 0.8523

jest.mock('../src/rates', () => ({
  getRates: () => [
    { currency: GBP, date: formattedToday, rate: todayRate },
    { currency: GBP, date: anotherDate, rate: anotherDateRate },
  ],
}))

describe('converter', () => {
  describe('getRateAtDate', () => {
    it('should throw an error when date is in the future', () => {
      const tomorrow = addDays(today, 1)
      const methodCall = () => getRateAtDate(EUR, tomorrow)
      expect(methodCall).toThrowError('Date is in the future')
    })

    it('should throw an error when date is more than 90 days ago', () => {
      const aLongTimeAgo = addDays(today, -100)
      const methodCall = () => getRateAtDate(EUR, aLongTimeAgo)
      expect(methodCall).toThrowError('Date is older than 90 days')
    })

    it('should throw when date is not available', () => {
      const unavailableDate = addDays(today, -5)
      const methodCall = () => getRateAtDate(GBP, unavailableDate)
      expect(methodCall).toThrowError('Date not available. Rates available for working days only')
    })

    it('should throw an error when currency is not a valid code', () => {
      const methodCall = () => getRateAtDate('ANTANI')
      expect(methodCall).toThrowError('Currency not available')
    })

    it('should return today date when date is null', () => {
      const output = getRateAtDate(EUR)
      expect(output.date).toBe(formattedToday)
    })

    it('should return the parameter currency', () => {
      const output = getRateAtDate(EUR)
      expect(output.currency).toBe(EUR)
    })

    it('should return 1 as rate when currency is EUR', () => {
      const output = getRateAtDate(EUR)
      expect(output.rate).toBe(1)
    })

    it("should return today's rate when date is undefined", () => {
      const output = getRateAtDate(GBP)
      expect(output.rate).toBe(todayRate)
    })

    it("should return today's rate when date is null", () => {
      const output = getRateAtDate(GBP, null)
      expect(output.rate).toBe(todayRate)
    })

    it("should return date's rate when date is not null", () => {
      const output = getRateAtDate(GBP, anotherDate)
      expect(output.rate).toBe(anotherDateRate)
    })
  })

  describe('convert', () => {
    it('should return 0 when amount is 0', () => {
      const input = 0
      const output = convert(input, EUR, GBP)
      expect(output.amount).toBe(0)
    })

    it('should return the amount when source and dest are equal', () => {
      const input = 5.5
      const output = convert(input, EUR, EUR)
      expect(output.amount).toBe(input)
    })

    it('should convert the amount when source and dest are different', () => {
      const input = 10
      const output = convert(input, EUR, GBP)
      expect(output.amount).toBe(input * todayRate)
    })

    it('should return the dest currency', () => {
      const output = convert(0, EUR, GBP)
      expect(output.currency).toBe(GBP)
    })
  })
})
