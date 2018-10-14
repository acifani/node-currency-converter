import { getRates, update } from '../src/rates'

describe('rates', () => {
  describe('update', () => {
    it('should not update with no data', () => {
      const before = getRates()
      update('')
      const after = getRates()
      expect(after).toEqual(before)
    })

    it('should fail with malformed XML', () => {
      const methodCall = () => update('!!?? Totally not a valid XML')
      expect(methodCall).toThrowError('Error while parsing XML')
    })
  })
})
