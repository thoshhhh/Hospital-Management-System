"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PatientTableSupabase, type PatientWithProfile } from "@/components/patients/patient-table-supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function PatientsPage() {
  const [patients, setPatients] = useState<PatientWithProfile[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const client = createClient()
    client
      .from("patients")
      .select("*, profiles(full_name)")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error) setPatients((data as PatientWithProfile[]) ?? [])
        setLoading(false)
      })
  }, [])

  const filtered = search
    ? patients.filter((p) => {
        const name = p.profiles?.full_name?.toLowerCase() ?? ""
        const id = p.id.toLowerCase()
        return name.includes(search.toLowerCase()) || id.includes(search.toLowerCase())
      })
    : patients

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Patients</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage and view patient records.</p>
          </div>
          {/* Admin can add patients via Supabase dashboard or a future "Add Patient" flow */}
        </div>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        {loading ? (
          <p className="text-muted-foreground">Loading patients…</p>
        ) : (
          <PatientTableSupabase patients={filtered} />
        )}
      </div>
    </DashboardLayout>
  )
}
