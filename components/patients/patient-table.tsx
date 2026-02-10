"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
} from "@/components/ui/dialog"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { type Patient } from "@/lib/mock-data"
import { PatientDetails } from "./patient-details"

const statusStyles: Record<string, string> = {
  Admitted: "bg-primary/10 text-primary border-primary/20",
  Discharged: "bg-success/10 text-success border-success/20",
}

export function PatientTable({ patients }: { patients: Patient[] }) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  return (
    <>
      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Patient ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Age</TableHead>
              <TableHead className="hidden md:table-cell">Gender</TableHead>
              <TableHead className="hidden lg:table-cell">Contact</TableHead>
              <TableHead className="hidden md:table-cell">Disease</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-mono text-xs text-muted-foreground">{patient.id}</TableCell>
                <TableCell className="font-medium">{patient.name}</TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">{patient.age}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{patient.gender}</TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground">{patient.contact}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{patient.disease}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusStyles[patient.status]}>
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View patient</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit patient</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete patient</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
            <DialogDescription>Complete medical profile and history</DialogDescription>
          </DialogHeader>
          {selectedPatient && <PatientDetails patient={selectedPatient} />}
        </DialogContent>
      </Dialog>
    </>
  )
}
