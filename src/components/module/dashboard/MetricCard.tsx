import { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string
  change: string
  icon: ReactNode
  highlighted?: boolean
}

export function MetricCard({
  title,
  value,
  change,
  icon,
  highlighted = false,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        'border transition-all',
        highlighted
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-card text-card-foreground border-border hover:border-primary/50'
      )}
    >
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-3 md:mb-4">
          <div className="min-w-0">
            <p className={cn('text-xs md:text-sm font-medium mb-1', highlighted ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
              {title}
            </p>
            <p className={cn('text-xl md:text-2xl lg:text-3xl font-bold wrap-break-word', highlighted ? 'text-primary-foreground' : 'text-foreground')}>
              {value}
            </p>
          </div>
          <div className={cn('p-1.5 md:p-2 rounded-full shrink-0', highlighted ? 'bg-primary-foreground/20' : 'bg-primary/10 text-primary')}>
            {icon}
          </div>
        </div>
        <p className={cn('text-xs font-medium truncate', highlighted ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
          {highlighted ? '📈 ' : '📊 '}{change}
        </p>
      </CardContent>
    </Card>
  )
}
