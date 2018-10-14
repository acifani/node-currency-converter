import { differenceInDays, format, isFuture } from 'date-fns'
import { Currency, DailyRate, getRates } from './rates'

type JSONResponse = {
  amount: number
  currency: Currency
}

export function convert(
  amount: number,
  source: Currency,
  dest: Currency,
  date?: Date | string | null,
): JSONResponse {
  const sourceRate = getRateAtDate(source, date)
  const destRate = getRateAtDate(dest, date)
  const convertedAmount = amount * (destRate.rate / sourceRate.rate)
  return {
    amount: convertedAmount,
    currency: destRate.currency,
  }
}

export function getRateAtDate(
  currency: Currency,
  date: Date | string | null = new Date(),
): DailyRate {
  const today = new Date()
  const referenceDate = date || today
  const formattedDate = format(referenceDate, 'YYYY-MM-DD')

  if (isFuture(referenceDate)) {
    throw new Error('Date is in the future')
  }

  if (differenceInDays(today, referenceDate) > 90) {
    throw new Error('Date is older than 90 days')
  }

  if (currency === 'EUR') {
    return { currency, date: formattedDate, rate: 1 }
  }

  const rates = getRates()

  const dailyRates = rates.filter(r => r.date === formattedDate)
  if (dailyRates.length === 0) {
    throw new Error('Date not available. Rates available for working days only')
  }

  const currencyRate = dailyRates.find(r => r.currency === currency)
  if (currencyRate == null) {
    throw new Error('Currency not available')
  }

  return currencyRate
}
