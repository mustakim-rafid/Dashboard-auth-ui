'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

export function ProjectProgressChart({ products }: { products: any[] }) {
  const data = products.map((p, index) => ({
    name: p.name,
    value: p.sales,
    fill: ['#10b981', '#064e3b', '#6ee7b7', '#d1d5db'][index % 4],
  }))

  const total = products.reduce((sum, p) => sum + p.sales, 0)

  return (
    <div className="w-full h-64 flex flex-col items-center justify-center">
      <div className="relative w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xl font-bold">{total}</p>
          <p className="text-xs text-muted-foreground">Total Sales</p>
        </div>
      </div>
    </div>
  )
}