"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { appointments } from "@/lib/mock-data"

const statusStyles: Record<string, string> = {
  Scheduled: "bg-primary/10 text-primary border-primary/20",
  Completed: "bg-success/10 text-success border-success/20",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
}

export function RecentAppointments() {
  const recent = appointments.slice(0, 5)

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Recent Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="hidden md:table-cell">Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recent.map((apt) => (
              <TableRow key={apt.id}>
                <TableCell className="font-medium">{apt.patient}</TableCell>
                <TableCell className="text-muted-foreground">{apt.doctor}</TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">{apt.date}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{apt.time}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusStyles[apt.status]}>
                    {apt.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
