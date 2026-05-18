import { Button } from './Button'

export const ErrorState = ({
  text,
  onRetry,
}: {
  text: string
  onRetry?: () => void
}) => (
  <div className="space-y-3 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
    <p>{text}</p>
    {onRetry ? (
      <Button variant="danger" onClick={onRetry}>
        Tentar novamente
      </Button>
    ) : null}
  </div>
)
