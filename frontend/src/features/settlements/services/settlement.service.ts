import { useMutation } from '@tanstack/react-query'
import { api } from '../../../lib/api'
import type { CreateSettlementRequest, CreateSettlementResponse } from '../../../types/api'

export const useCreateSettlement = () =>
  useMutation({
    mutationFn: async (payload: CreateSettlementRequest) => {
      const { data } = await api.post<CreateSettlementResponse>('/settlements', payload)
      return data
    },
    retry: false,
  })
