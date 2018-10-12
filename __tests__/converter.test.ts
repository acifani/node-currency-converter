import { convert, getRateAtDate } from '../src/converter'
import { addDays } from 'date-fns'

describe('converter', () => {
  describe('getRateAtDate', () => {
    it('should throw an error when date is in the future', () => {
      const today = new Date()
      const tomorrow = addDays(today, 1)
      const methodCall = () => getRateAtDate('EUR', tomorrow)
      expect(methodCall).toThrowError('Date is in the future')
    })

    it('should throw an error when date is more than 90 days ago', () => {
      const today = new Date()
      const aLongTimeAgo = addDays(today, -100)
      const methodCall = () => getRateAtDate('EUR', aLongTimeAgo)
      expect(methodCall).toThrowError('Date is older than 90 days')
    })

    it('should throw an error when source is not a valid code', () => {})

    it('should throw an error when dest is not a valid code', () => {})

    it("should return today's rate when date is null", () => {})

    it("should return date's rate when date is not null", () => {})
  })

  describe('convert', () => {
    it('should return 0 when amount is 0', () => {
      const input = 0
      const output = convert(input, 'EUR', 'GBP')
      expect(output).toBe(input)
    })

    it('should return the amount when source and dest are equal', () => {
      const input = 5.5
      const output = convert(input, 'EUR', 'EUR')
      expect(output).toBe(input)
    })

    it('should convert the amount when source and dest are different', () => {})
  })
})
