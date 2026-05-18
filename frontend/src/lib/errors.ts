import axios, { type AxiosError } from 'axios'

export interface NormalizedApiError {
  message: string
  status?: number
  traceId?: string
}

export const normalizeApiError = (error: unknown): NormalizedApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string; error?: string }>
    const traceId =
      (axiosError.response?.headers?.['x-trace-id'] as string | undefined) ??
      (axiosError.response?.headers?.['X-Trace-Id'] as string | undefined)

    if (axiosError.response?.status === 409) {
      return {
        message: 'Esta liquidação já foi processada para a mesma chave idempotente.',
        status: axiosError.response.status,
        traceId,
      }
    }

    return {
      message:
        axiosError.response?.data?.message ??
        axiosError.response?.data?.error ??
        axiosError.message ??
        'Erro inesperado ao chamar API.',
      status: axiosError.response?.status,
      traceId,
    }
  }

  if (error instanceof Error) {
    return { message: error.message }
  }

  return { message: 'Erro inesperado.' }
}
