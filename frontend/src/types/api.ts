export type UUID = string

export type ReceivableType = 'MERCANTILE_DUPLICATE' | 'POSTDATED_CHECK'
export type SettlementStatus = 'PENDING' | 'SETTLED' | 'FAILED' | 'CANCELLED'

export interface Currency {
  id: UUID
  code: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'BRL'
  name: string
  decimalPlaces: number
  createdAt?: string
}

export interface CreateCurrencyRequest {
  code: Currency['code']
  name: string
  decimalPlaces: number
}

export interface ExchangeRate {
  id: UUID
  fromCurrencyId: UUID
  toCurrencyId: UUID
  rate: string
  effectiveAt: string
  source: string
  createdAt?: string
}

export interface CreateExchangeRateRequest {
  fromCurrencyId: UUID
  toCurrencyId: UUID
  rate: string
  effectiveAt: string
  source: string
}

export interface Assignor {
  id: UUID
  document: string
  name: string
  createdAt?: string
}

export interface CreateAssignorRequest {
  document: string
  name: string
}

export interface PricingSimulationRequest {
  receivableType: ReceivableType
  faceValue: string
  baseRate: string
  issueDate: string
  dueDate: string
  faceCurrencyId: UUID
  paymentCurrencyId: UUID
}

export interface PricingSimulationResponse {
  faceValue: string
  presentValue: string
  convertedPresentValue: string
  baseRate: string
  spread: string
  totalRate: string
  termDays: number
  termMonths: number
  exchangeRate?: string
  exchangeRateId?: UUID
}

export interface SettlementReceivableRequest {
  type: ReceivableType
  faceValue: string
  faceCurrencyId: UUID
  issueDate: string
  dueDate: string
}

export interface CreateSettlementRequest {
  assignorId: UUID
  paymentCurrencyId: UUID
  baseRate: string
  idempotencyKey: string
  receivables: SettlementReceivableRequest[]
}

export interface SettledReceivable {
  receivableId: UUID
  status: SettlementStatus
  faceValue: string
  presentValue: string
  convertedPresentValue: string
  exchangeRate?: string
  exchangeRateId?: UUID
}

export interface CreateSettlementResponse {
  batchId: UUID
  status: SettlementStatus
  paymentCurrencyId: UUID
  settledAt?: string
  receivables: SettledReceivable[]
}

export interface SettlementExtractQuery {
  from?: string
  to?: string
  assignorId?: UUID
  currencyId?: UUID
  faceCurrencyId?: UUID
  paymentCurrencyId?: UUID
  receivableType?: ReceivableType
  status?: SettlementStatus
  page?: number
  pageSize?: number
}

export interface SettlementExtractItem {
  batchId: UUID
  receivableId: UUID
  createdAt: string
  assignorName: string
  assignorDocument: string
  receivableType: ReceivableType
  batchStatus: SettlementStatus
  receivableStatus: SettlementStatus
  faceValue: string
  presentValue: string
  convertedPresentValue: string
  faceCurrencyCode: string
  paymentCurrencyCode: string
  exchangeRate?: string
}

export interface SettlementExtractResponse {
  items: SettlementExtractItem[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}
