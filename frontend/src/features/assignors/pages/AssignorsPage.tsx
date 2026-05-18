import { AssignorList } from '../components/AssignorList'
import { CreateAssignorForm } from '../components/CreateAssignorForm'

export const AssignorsPage = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-semibold">Cedentes</h2>
    <CreateAssignorForm />
    <AssignorList />
  </div>
)
