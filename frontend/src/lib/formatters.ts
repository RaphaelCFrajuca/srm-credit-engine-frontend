import { format } from 'date-fns'

export const formatCurrencyValue = (value: string | number, currencyCode = 'BRL') => {
  const amount = typeof value === 'string' ? Number(value) : value

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(amount) ? amount : 0)
}

export const formatDecimal = (value: string | number) => {
  const amount = typeof value === 'string' ? Number(value) : value
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 10 }).format(
    Number.isFinite(amount) ? amount : 0,
  )
}

export const formatDateTime = (value: string) => format(new Date(value), 'dd/MM/yyyy HH:mm')

export const formatDate = (value: string) => format(new Date(value), 'dd/MM/yyyy')

export const formatPercentDecimal = (value: string) => {
  const amount = Number(value)
  return `${(Number.isFinite(amount) ? amount * 100 : 0).toFixed(2)}%`
}
