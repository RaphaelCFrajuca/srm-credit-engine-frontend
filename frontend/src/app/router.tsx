import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { AssignorsPage } from '../features/assignors/pages/AssignorsPage'
import { CurrenciesPage } from '../features/currencies/pages/CurrenciesPage'
import { DashboardPage } from '../features/reports/pages/DashboardPage'
import { ExchangeRatesPage } from '../features/exchange-rates/pages/ExchangeRatesPage'
import { PricingSimulationPage } from '../features/pricing/pages/PricingSimulationPage'
import { SettlementExtractPage } from '../features/reports/pages/SettlementExtractPage'
import { SettlementCreatePage } from '../features/settlements/pages/SettlementCreatePage'

export const AppRouter = () => (
  <AppLayout>
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/currencies" element={<CurrenciesPage />} />
      <Route path="/exchange-rates" element={<ExchangeRatesPage />} />
      <Route path="/assignors" element={<AssignorsPage />} />
      <Route path="/pricing/simulate" element={<PricingSimulationPage />} />
      <Route path="/settlements/new" element={<SettlementCreatePage />} />
      <Route path="/settlements/extract" element={<SettlementExtractPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </AppLayout>
)
