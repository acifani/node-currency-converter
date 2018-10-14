import { readFileSync } from 'fs'
import { clearRates, getRates, update } from '../src/rates'

let VALID_XML: string
let MALFORMED_XML: string

beforeAll(async () => {
  VALID_XML = await readFileSync(__dirname + '/resources/daily.xml').toString()
  MALFORMED_XML = await readFileSync(__dirname + '/resources/malformed.xml').toString()
})

describe('rates', () => {
  describe('update', () => {
    it('should not update with no data', () => {
      const before = getRates()
      update('')
      const after = getRates()
      expect(after).toEqual(before)
    })

    it('should fail with invalid XML', () => {
      const methodCall = () => update('!!?? Totally not a valid XML')
      expect(methodCall).toThrowError('Error while parsing XML')
    })

    it('should fail with malformed XML', () => {
      const methodCall = () => update(MALFORMED_XML)
      expect(methodCall).toThrowError('Error while parsing XML')
    })

    it('should not fail with valid XML', () => {
      const methodCall = () => update(VALID_XML)
      expect(methodCall).not.toThrow()
    })
  })

  describe('getRates', () => {
    it('should return an empty array when data is not initialized', () => {
      clearRates()
      const output = getRates()
      expect(output).toEqual([])
    })

    it('should not return an empty array with initialized data', () => {
      update(VALID_XML)
      const output = getRates()
      expect(output).not.toEqual([])
    })

    it('should return data with initialized data', () => {
      update(VALID_XML)
      const output = getRates()
      expect(output[0]).not.toBeNull()
      expect(output[0].currency).not.toBeNull()
      expect(output[0].date).not.toBeNull()
      expect(output[0].rate).not.toBeNull()
    })
  })
})
