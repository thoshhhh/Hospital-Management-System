"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin } from "lucide-react"
import { upcomingSurgeries } from "@/lib/mock-data"

export function UpcomingSurgeries() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Upcoming Surgeries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {upcomingSurgeries.map((surgery) => (
            <div
              key={surgery.id}
              className="flex items-start gap-3 rounded-lg border p-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive text-xs font-bold">
                {surgery.date.slice(8)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{surgery.type}</p>
                <p className="text-xs text-muted-foreground">{surgery.patient} - {surgery.surgeon}</p>
                <div className="mt-1.5 flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {surgery.time}
                  </span>
                  <Badge variant="outline" className="h-5 text-[10px] px-1.5">
                    <MapPin className="mr-0.5 h-2.5 w-2.5" />
                    {surgery.room}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
