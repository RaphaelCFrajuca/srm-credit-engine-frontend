import { useMutation } from '@tanstack/react-query'
import { api } from '../../../lib/api'
import type { PricingSimulationRequest, PricingSimulationResponse } from '../../../types/api'

export const useSimulatePricing = () =>
  useMutation({
    mutationFn: async (payload: PricingSimulationRequest) => {
      const { data } = await api.post<PricingSimulationResponse>('/pricing/simulate', payload)
      return data
    },
    retry: false,
  })
