import axios from 'axios'
import { env } from '../config/env'

const TRACE_ID_KEY = '__traceId'

export const api = axios.create({
  baseURL: env.apiBaseUrl,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const traceId =
      error?.response?.headers?.['x-trace-id'] ?? error?.response?.headers?.['X-Trace-Id']

    if (traceId) {
      ;(error as Record<string, unknown>)[TRACE_ID_KEY] = traceId
    }

    return Promise.reject(error)
  },
)

export const getTraceIdFromError = (error: unknown): string | undefined => {
  if (typeof error === 'object' && error && TRACE_ID_KEY in error) {
    return (error as Record<string, string>)[TRACE_ID_KEY]
  }

  if (typeof error === 'object' && error && 'response' in error) {
    const response = (error as { response?: { headers?: Record<string, string> } }).response
    return response?.headers?.['x-trace-id'] ?? response?.headers?.['X-Trace-Id']
  }

  return undefined
}
