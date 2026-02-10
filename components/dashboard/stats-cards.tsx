"use client"

import { Users, CalendarDays, Stethoscope, DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    title: "Total Patients",
    value: "1,284",
    change: "+12.5%",
    trend: "up" as const,
    icon: Users,
    color: "text-primary bg-primary/10",
  },
  {
    title: "Appointments Today",
    value: "42",
    change: "+8.2%",
    trend: "up" as const,
    icon: CalendarDays,
    color: "text-accent bg-accent/10",
  },
  {
    title: "Available Doctors",
    value: "18",
    change: "-2.1%",
    trend: "down" as const,
    icon: Stethoscope,
    color: "text-warning bg-warning/10",
  },
  {
    title: "Revenue (Monthly)",
    value: "$210,000",
    change: "+15.3%",
    trend: "up" as const,
    icon: DollarSign,
    color: "text-success bg-success/10",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">{stat.title}</span>
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              </div>
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs">
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-success" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={stat.trend === "up" ? "text-success font-medium" : "text-destructive font-medium"}>
                {stat.change}
              </span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
