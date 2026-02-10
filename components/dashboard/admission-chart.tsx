"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { monthlyAdmissions } from "@/lib/mock-data"

export function AdmissionChart() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Patient Admissions</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthlyAdmissions} barSize={32}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(215 10% 45%)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(215 10% 45%)" }}
            />
            <Tooltip
              cursor={{ fill: "hsl(210 14% 95%)" }}
              contentStyle={{
                backgroundColor: "hsl(0 0% 100%)",
                border: "1px solid hsl(214 20% 90%)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Bar
              dataKey="admissions"
              fill="hsl(199 89% 42%)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
