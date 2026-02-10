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
import { Eye } from "lucide-react"
import type { Patient } from "@/lib/database.types"

export type PatientWithProfile = Patient & { profiles?: { full_name: string | null } | null }

export function PatientTableSupabase({ patients }: { patients: PatientWithProfile[] }) {
  const [selected, setSelected] = useState<PatientWithProfile | null>(null)

  const name = (p: PatientWithProfile) => p.profiles?.full_name ?? "—"

  return (
    <>
      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Age</TableHead>
              <TableHead className="hidden md:table-cell">Gender</TableHead>
              <TableHead className="hidden md:table-cell">Medical history</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-mono text-xs text-muted-foreground">{patient.id.slice(0, 8)}…</TableCell>
                <TableCell className="font-medium">{name(patient)}</TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">{patient.age ?? "—"}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{patient.gender ?? "—"}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {(patient.medical_history?.length ?? 0) > 0 ? `${patient.medical_history!.length} items` : "—"}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelected(patient)}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
            <DialogDescription>Profile and medical history</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <p><span className="text-muted-foreground">Name:</span> {name(selected)}</p>
              <p><span className="text-muted-foreground">Age:</span> {selected.age ?? "—"}</p>
              <p><span className="text-muted-foreground">Gender:</span> {selected.gender ?? "—"}</p>
              <div>
                <p className="text-muted-foreground mb-1">Medical history</p>
                {selected.medical_history?.length ? (
                  <ul className="list-disc pl-4 text-sm">
                    {selected.medical_history.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm">None recorded.</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
