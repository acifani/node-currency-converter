import axios from 'axios'
import logger from './logger'
import * as rates from './rates'

const dataURL = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml'

export default async function warmup() {
  logger.info('Fetching latest XML')
  try {
    const res = await axios.get(dataURL, { responseType: 'text' })
    if (!res.data) {
      throw new Error('Empty response')
    }

    rates.update(res.data)
    const noOfRates = rates.getRates().length
    logger.info(`Initialized with ${noOfRates} rates`)
  } catch (err) {
    return logger.error(err)
  }
}
