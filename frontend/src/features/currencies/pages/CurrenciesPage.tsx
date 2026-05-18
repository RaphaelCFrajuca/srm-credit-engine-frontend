import { CreateCurrencyForm } from '../components/CreateCurrencyForm'
import { CurrencyList } from '../components/CurrencyList'

export const CurrenciesPage = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-semibold">Moedas</h2>
    <CreateCurrencyForm />
    <CurrencyList />
  </div>
)
