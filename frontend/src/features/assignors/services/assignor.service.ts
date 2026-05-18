import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../../lib/api'
import type { Assignor, CreateAssignorRequest } from '../../../types/api'

const ASSIGNORS_KEY = ['assignors'] as const

export const useAssignors = () =>
  useQuery({
    queryKey: ASSIGNORS_KEY,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const { data } = await api.get<Assignor[]>('/assignors')
      return data
    },
  })

export const useCreateAssignor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateAssignorRequest) => {
      const { data } = await api.post<Assignor>('/assignors', payload)
      return data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ASSIGNORS_KEY })
    },
  })
}
