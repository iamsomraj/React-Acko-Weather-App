
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/Spinner/Spinner'
import { ActionButton } from '@/components/ActionButton/ActionButton'

export function DebugTest() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold">Component Test</h2>
      <Button>Test Button</Button>
      <Input placeholder="Test Input" />
      <Card className="p-4">
        <div>Test Card</div>
      </Card>
      <Spinner text="Test Spinner" />
      <ActionButton body="Test Action" path="/" />
    </div>
  )
}

export default DebugTest
