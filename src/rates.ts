// tslint:disable:variable-name
import { parseString } from 'xml2js'

type Envelope = {
  'gesmes:Envelope': {
    Cube: [{
      Cube: [{
        $: { time: Date }
        Cube: [{
          $: {
            currency: Currency,
            rate: Rate,
          }
        }]
      }]
    }]
  }
}

export type Currency = string
type Date = string
type Rate = number
export type DailyRate = {
  currency: Currency
  date: Date
  rate: Rate
}
type Rates = DailyRate[]

let _rates: Rates = []

export const getRates = (): Rates => _rates

export function update(data?: string): void {
  if (!data) {
    return
  }

  initRatesFromXML(data)
}

export const clearRates = () => _rates = []

function initRatesFromXML(data: string): void {
  const callback = (err: any, res?: Envelope) => {
    if (err || !res) {
      throw Error(err || 'Empty XML')
    }
    _rates = parseXML(res)
  }

  try {
    parseString(data, callback)
  } catch (e) {
    throw Error('Error while parsing XML')
  }
}

function parseXML(res: Envelope): Rates {
  const data = res['gesmes:Envelope'].Cube[0].Cube
  // Bit of a Hack to infer the correct type
  const dataToRates = (d: typeof data[0]) => {
    const date = d.$.time
    return d.Cube.map(r => ({
      currency: r.$.currency,
      date,
      rate: r.$.rate,
    }))
  }

  return flatMap(dataToRates, data)
}

function flatMap<T, Z>(fn: (e: T) => Z[], arr: T[]): Z[] {
  const concat = (x: Z[], y: Z[]) => x.concat(y)
  return arr.map(fn).reduce(concat, [])
}
