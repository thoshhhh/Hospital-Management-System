"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts"
import { revenueData, patientGrowth, appointmentAnalytics } from "@/lib/mock-data"

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Analytics and insights for hospital operations.</p>
        </div>

        {/* Revenue Chart */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(199 89% 42%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(199 89% 42%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(215 10% 45%)" }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "hsl(215 10% 45%)" }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0 0% 100%)",
                    border: "1px solid hsl(214 20% 90%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(199 89% 42%)"
                  strokeWidth={2}
                  fill="url(#revenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Patient Growth */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Patient Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={patientGrowth} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(215 10% 45%)" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(215 10% 45%)" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0 0% 100%)",
                      border: "1px solid hsl(214 20% 90%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar dataKey="newPatients" name="New Patients" fill="hsl(199 89% 42%)" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="returning" name="Returning" fill="hsl(172 66% 40%)" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Appointment Analytics */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Appointment Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={appointmentAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(215 10% 45%)" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(215 10% 45%)" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0 0% 100%)",
                      border: "1px solid hsl(214 20% 90%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Line type="monotone" dataKey="scheduled" name="Scheduled" stroke="hsl(199 89% 42%)" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="completed" name="Completed" stroke="hsl(152 60% 42%)" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="cancelled" name="Cancelled" stroke="hsl(0 72% 51%)" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
