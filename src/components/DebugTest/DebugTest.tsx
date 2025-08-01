import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/Spinner/Spinner'
import { ActionButton } from '@/components/ActionButton/ActionButton'

export function DebugTest() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold">Component Testing</h2>
      <Button>Sample Button</Button>
      <Input placeholder="Sample input field" />
      <Card className="p-4">
        <div>Sample Card Component</div>
      </Card>
      <Spinner text="Loading components..." />
      <ActionButton body="Navigate Home" path="/" />
    </div>
  )
}

export default DebugTest
