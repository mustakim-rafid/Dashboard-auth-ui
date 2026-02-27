import { Users, DollarSign, TrendingUp, UserCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/module/dashboard/MetricCard'
import { ProjectAnalyticsChart } from '@/components/module/dashboard/charts/ProjectAnalyticsChart'
import { TeamCollaborationList } from '@/components/module/dashboard/TeamCollaborationList'
import { ProjectProgressChart } from '@/components/module/dashboard/charts/ProjectProgressChart'
import { ProductsList } from '@/components/module/dashboard/ProductsList'
import { DashboardData } from '@/types'

export default async function DashboardPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/dashboard`);

  const result: DashboardData = await res.json()

  const { overview, analytics, users, products } = result

  return (
    <div className="p-6 space-y-8">

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Users"
          value={overview.totalUsers.toLocaleString()}
          change="All registered users"
          icon={<Users className="w-5 h-5" />}
          highlighted
        />

        <MetricCard
          title="Active Users"
          value={overview.activeUsers.toLocaleString()}
          change="Currently active"
          icon={<UserCheck className="w-5 h-5" />}
        />

        <MetricCard
          title="Revenue"
          value={`$${overview.revenue.toLocaleString()}`}
          change={`${overview.growth}% growth`}
          icon={<DollarSign className="w-5 h-5" />}
        />

        <MetricCard
          title="Growth Rate"
          value={`${overview.growth}%`}
          change="Compared to last period"
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left */}
        <div className="lg:col-span-2 space-y-6">

          <Card>
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectAnalyticsChart data={analytics} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
            </CardHeader>
            <CardContent>
              <TeamCollaborationList users={users} />
            </CardContent>
          </Card>

        </div>

        {/* Right */}
        <div className="space-y-6">

          <Card>
            <CardHeader>
              <CardTitle>Sales Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectProgressChart products={products} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductsList products={products} />
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}