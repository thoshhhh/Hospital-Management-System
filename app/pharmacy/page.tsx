"use client"

import { DashboardLayout } from "@/components/dashboard-layout"

export default function PharmacyPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Pharmacy</h1>
        <p className="text-muted-foreground">Pharmacy module is not included in this minimal system.</p>
      </div>
    </DashboardLayout>
  )
}
