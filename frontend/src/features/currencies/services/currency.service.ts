import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../../lib/api'
import type { CreateCurrencyRequest, Currency } from '../../../types/api'

const CURRENCIES_KEY = ['currencies'] as const

export const useCurrencies = () =>
  useQuery({
    queryKey: CURRENCIES_KEY,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const { data } = await api.get<Currency[]>('/currencies')
      return data
    },
  })

export const useCreateCurrency = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateCurrencyRequest) => {
      const { data } = await api.post<Currency>('/currencies', payload)
      return data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CURRENCIES_KEY })
    },
  })
}
