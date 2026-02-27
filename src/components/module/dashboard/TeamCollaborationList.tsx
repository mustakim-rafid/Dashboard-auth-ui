import { Badge } from '@/components/ui/badge'

export function TeamCollaborationList({ users }: { users: any[] }) {
  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-start gap-3 pb-4 border-b last:border-0">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
            <div className="mt-2">
              <Badge variant="outline">
                {user.status}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}