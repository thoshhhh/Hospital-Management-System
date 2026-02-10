"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentAppointments } from "@/components/dashboard/recent-appointments"
import { UpcomingSurgeries } from "@/components/dashboard/upcoming-surgeries"
import { BedOccupancy } from "@/components/dashboard/bed-occupancy"
import { AdmissionChart } from "@/components/dashboard/admission-chart"
import { useProfile } from "@/hooks/use-profile"

export default function DashboardPage() {
  const { profile, role } = useProfile()
  const name = profile?.full_name || "User"
  const roleLabel = role === "admin" ? "Admin" : role === "doctor" ? "Doctor" : "Patient"

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back, {name}. Here is your {roleLabel.toLowerCase()} overview.</p>
        </div>
        <StatsCards />
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <AdmissionChart />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-6">
            <BedOccupancy />
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentAppointments />
          </div>
          <div>
            <UpcomingSurgeries />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
