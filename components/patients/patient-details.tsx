"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { User, Phone, MapPin, Droplets, Calendar, Stethoscope } from "lucide-react"
import { type Patient, medicalHistory, prescriptions } from "@/lib/mock-data"

export function PatientDetails({ patient }: { patient: Patient }) {
  const history = medicalHistory[patient.id] || []
  const patientPrescriptions = prescriptions.filter((p) => p.patientId === patient.id)

  return (
    <div className="flex flex-col gap-4">
      {/* Personal Info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="text-sm font-medium">{patient.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Age / Gender</p>
                <p className="text-sm font-medium">{patient.age} / {patient.gender}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Contact</p>
                <p className="text-sm font-medium">{patient.contact}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Blood Group</p>
                <p className="text-sm font-medium">{patient.bloodGroup}</p>
              </div>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="text-sm font-medium">{patient.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Attending Doctor</p>
                <p className="text-sm font-medium">{patient.doctor}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <Badge
                variant="outline"
                className={
                  patient.status === "Admitted"
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "bg-success/10 text-success border-success/20"
                }
              >
                {patient.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical History */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Medical History</CardTitle>
        </CardHeader>
        <CardContent>
          {history.length > 0 ? (
            <div className="flex flex-col gap-3">
              {history.map((record, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{record.diagnosis}</p>
                    <span className="text-xs text-muted-foreground">{record.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{record.treatment}</p>
                  <p className="text-xs text-muted-foreground">By {record.doctor}</p>
                  {idx < history.length - 1 && <Separator className="mt-3" />}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No medical history recorded.</p>
          )}
        </CardContent>
      </Card>

      {/* Prescriptions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Prescriptions</CardTitle>
        </CardHeader>
        <CardContent>
          {patientPrescriptions.length > 0 ? (
            <div className="flex flex-col gap-3">
              {patientPrescriptions.map((rx) => (
                <div key={rx.id} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{rx.medication}</p>
                    <Badge variant="secondary" className="text-[10px]">{rx.id}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{rx.dosage}</p>
                  <p className="text-xs text-muted-foreground">
                    {rx.startDate} to {rx.endDate} - {rx.doctor}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No prescriptions found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
