import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '../../../lib/api'
import type { CreateExchangeRateRequest, ExchangeRate } from '../../../types/api'

export interface ExchangeRateFilters {
  fromCurrencyId?: string
  toCurrencyId?: string
  startDate?: string
  endDate?: string
}

export const useExchangeRateHistory = (filters: ExchangeRateFilters) =>
  useQuery({
    queryKey: ['exchange-rates', filters],
    enabled: Boolean(filters.fromCurrencyId && filters.toCurrencyId),
    queryFn: async () => {
      const { data } = await api.get<ExchangeRate[]>('/exchange-rates', { params: filters })
      return data
    },
  })

export const useLatestExchangeRate = (fromCurrencyId?: string, toCurrencyId?: string, effectiveAt?: string) =>
  useQuery({
    queryKey: ['exchange-rates', 'latest', fromCurrencyId, toCurrencyId, effectiveAt],
    enabled: Boolean(fromCurrencyId && toCurrencyId),
    queryFn: async () => {
      const { data } = await api.get<ExchangeRate>('/exchange-rates/latest', {
        params: { fromCurrencyId, toCurrencyId, effectiveAt },
      })
      return data
    },
  })

export const useCreateExchangeRate = () =>
  useMutation({
    mutationFn: async (payload: CreateExchangeRateRequest) => {
      const { data } = await api.post<ExchangeRate>('/exchange-rates', payload)
      return data
    },
  })
