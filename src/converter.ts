import { differenceInDays, isFuture } from 'date-fns'

type Currency = string

export function getRateAtDate(currency: Currency, date?: Date): number {
  const today = new Date()

  if (date && isFuture(date)) {
    throw new Error('Date is in the future')
  }

  if (date && differenceInDays(today, date) > 90) {
    throw new Error('Date is older than 90 days')
  }

  return 0
}

export function convert(
  amount: number,
  source: Currency,
  dest: Currency,
  date?: Date,
): number {
  if (amount === 0) {
    return 0
  }

  if (source === dest) {
    return amount
  }

  const sourceRate = getRateAtDate(source, date)
  const destRate = getRateAtDate(dest, date)
  return amount * (destRate / sourceRate)
}
