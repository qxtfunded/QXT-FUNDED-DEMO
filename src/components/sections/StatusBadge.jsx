import { Badge } from '../ui/Primitives'
import { statusMeta } from '../../data/orders'

export default function StatusBadge({ status }) {
  const meta = statusMeta[status] || { label: status, tone: 'neutral' }
  return <Badge tone={meta.tone}>{meta.label}</Badge>
}
