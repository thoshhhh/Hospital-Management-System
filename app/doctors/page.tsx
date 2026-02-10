"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Briefcase, Users, Mail, Phone } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { createClient } from "@/lib/supabase/client"
import type { Doctor } from "@/lib/database.types"

type DoctorRow = Doctor & { profiles?: { full_name: string | null } | null }

const avatarColors = [
  "bg-primary/15 text-primary",
  "bg-accent/15 text-accent",
  "bg-warning/15 text-warning",
  "bg-success/15 text-success",
  "bg-destructive/15 text-destructive",
  "bg-chart-4/15 text-chart-4",
]

function availabilityStyle(available: boolean) {
  return available
    ? "bg-success/10 text-success border-success/20"
    : "bg-warning/10 text-warning border-warning/20"
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<DoctorRow[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorRow | null>(null)

  useEffect(() => {
    const client = createClient()
    client
      .from("doctors")
      .select("*, profiles(full_name)")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error) setDoctors((data as DoctorRow[]) ?? [])
        setLoading(false)
      })
  }, [])

  const displayName = (d: DoctorRow) => d.profiles?.full_name || "Doctor"

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Doctors</h1>
          <p className="text-sm text-muted-foreground mt-1">View all doctors and their availability status.</p>
        </div>
        {loading ? (
          <div className="text-muted-foreground">Loading doctors…</div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor, index) => (
              <Card key={doctor.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <Avatar className={`h-14 w-14 ${avatarColors[index % avatarColors.length]}`}>
                      <AvatarFallback className={`text-lg font-semibold ${avatarColors[index % avatarColors.length]}`}>
                        {displayName(doctor).split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground truncate">{displayName(doctor)}</h3>
                      <p className="text-xs text-muted-foreground">{doctor.specialization || "—"}</p>
                      <Badge variant="outline" className={`mt-2 ${availabilityStyle(doctor.availability_status)}`}>
                        {doctor.availability_status ? "Available" : "Busy"}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Briefcase className="h-3.5 w-3.5" />
                      <span>{doctor.experience_years ?? 0} yrs exp.</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full bg-transparent"
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedDoctor ? displayName(selectedDoctor) : ""}</DialogTitle>
            <DialogDescription>{selectedDoctor?.specialization || "—"}</DialogDescription>
          </DialogHeader>
          {selectedDoctor && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 bg-primary/15 text-primary">
                  <AvatarFallback className="text-xl font-semibold bg-primary/15 text-primary">
                    {displayName(selectedDoctor).split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Badge variant="outline" className={availabilityStyle(selectedDoctor.availability_status)}>
                    {selectedDoctor.availability_status ? "Available" : "Busy"}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">ID: {selectedDoctor.id.slice(0, 8)}…</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
                <div>
                  <p className="text-xs text-muted-foreground">Experience</p>
                  <p className="text-sm font-medium">{selectedDoctor.experience_years ?? 0} years</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Working hours</p>
                  <p className="text-sm font-medium">{selectedDoctor.working_hours || "—"}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
