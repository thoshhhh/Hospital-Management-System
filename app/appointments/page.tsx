"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, CalendarDays, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useProfile } from "@/hooks/use-profile"
import type { Appointment } from "@/lib/database.types"

type DoctorOption = { id: string; profile_id: string; profiles: { full_name: string | null } | null }
type AppointmentRow = Appointment & {
  patient_profile?: { full_name: string | null } | null
  doctor_profile?: { full_name: string | null } | null
}

const statusStyles: Record<string, string> = {
  Scheduled: "bg-primary/10 text-primary border-primary/20",
  Completed: "bg-success/10 text-success border-success/20",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString()
}

function formatTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentRow[]>([])
  const [doctors, setDoctors] = useState<DoctorOption[]>([])
  const [loading, setLoading] = useState(true)
  const [showBook, setShowBook] = useState(false)
  const [bookDoctorId, setBookDoctorId] = useState("")
  const [bookDate, setBookDate] = useState("")
  const [bookTime, setBookTime] = useState("")
  const [bookNotes, setBookNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [bookError, setBookError] = useState<string | null>(null)
  const { role } = useProfile()

  useEffect(() => {
    const client = createClient()
    client
      .from("appointments")
      .select("*, patient_profile:profiles!patient_id(full_name), doctor_profile:profiles!doctor_id(full_name)")
      .order("appointment_date", { ascending: true })
      .then(({ data, error }) => {
        if (!error) setAppointments((data as AppointmentRow[]) ?? [])
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const client = createClient()
    client
      .from("doctors")
      .select("id, profile_id, profiles(full_name)")
      .then(({ data, error }) => {
        if (!error) setDoctors((data as DoctorOption[]) ?? [])
      })
  }, [])

  async function handleBook(e: React.FormEvent) {
    e.preventDefault()
    setBookError(null)
    if (!bookDoctorId || !bookDate || !bookTime) {
      setBookError("Please select doctor, date, and time.")
      return
    }
    setSubmitting(true)
    const client = createClient()
    const dateTime = new Date(`${bookDate}T${bookTime}`).toISOString()
    const { error } = await client.from("appointments").insert({
      patient_id: (await client.auth.getUser()).data.user?.id,
      doctor_id: bookDoctorId,
      appointment_date: dateTime,
      status: "Scheduled",
      notes: bookNotes || null,
    })
    setSubmitting(false)
    if (error) {
      setBookError(error.message)
      return
    }
    setShowBook(false)
    setBookDoctorId("")
    setBookDate("")
    setBookTime("")
    setBookNotes("")
    // Refresh list
    client
      .from("appointments")
      .select("*, patient_profile:profiles!patient_id(full_name), doctor_profile:profiles!doctor_id(full_name)")
      .order("appointment_date", { ascending: true })
      .then(({ data }) => {
        if (data) setAppointments(data as AppointmentRow[])
      })
  }

  async function updateStatus(id: string, status: "Scheduled" | "Completed" | "Cancelled") {
    const client = createClient()
    await client.from("appointments").update({ status }).eq("id", id)
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)))
  }

  const patientName = (a: AppointmentRow) => a.patient_profile?.full_name ?? "—"
  const doctorName = (a: AppointmentRow) => a.doctor_profile?.full_name ?? "—"
  const canBook = role === "patient"
  const canUpdateStatus = role === "doctor" || role === "admin"

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Appointments</h1>
            <p className="text-sm text-muted-foreground mt-1">Schedule and manage appointments.</p>
          </div>
          {canBook && (
            <Button onClick={() => setShowBook(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          )}
        </div>

        <div className="rounded-lg border bg-card shadow-sm">
          {loading ? (
            <p className="p-4 text-muted-foreground">Loading appointments…</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">Time</TableHead>
                  <TableHead>Status</TableHead>
                  {canUpdateStatus && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((apt) => (
                  <TableRow key={apt.id}>
                    <TableCell className="font-medium">{patientName(apt)}</TableCell>
                    <TableCell className="text-muted-foreground">{doctorName(apt)}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">{formatDate(apt.appointment_date)}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{formatTime(apt.appointment_date)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusStyles[apt.status]}>
                        {apt.status}
                      </Badge>
                    </TableCell>
                    {canUpdateStatus && (
                      <TableCell className="text-right">
                        {apt.status === "Scheduled" && (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => updateStatus(apt.id, "Completed")}>
                              Complete
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => updateStatus(apt.id, "Cancelled")}>
                              Cancel
                            </Button>
                          </>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      <Dialog open={showBook} onOpenChange={setShowBook}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>Schedule a new appointment with a doctor.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBook} className="grid gap-4 py-2">
            {bookError && (
              <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{bookError}</div>
            )}
            <div className="grid gap-2">
              <Label>Doctor</Label>
              <Select value={bookDoctorId} onValueChange={setBookDoctorId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((d) => (
                    <SelectItem key={d.id} value={d.profile_id}>
                      {d.profiles?.full_name ?? "Doctor"} {d.profile_id.slice(0, 8)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Date</Label>
                <Input type="date" value={bookDate} onChange={(e) => setBookDate(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label>Time</Label>
                <Input type="time" value={bookTime} onChange={(e) => setBookTime(e.target.value)} required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Notes (optional)</Label>
              <Textarea placeholder="Notes..." rows={3} value={bookNotes} onChange={(e) => setBookNotes(e.target.value)} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowBook(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>{submitting ? "Booking…" : "Book"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
