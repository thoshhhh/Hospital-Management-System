"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { bedOccupancy } from "@/lib/mock-data"

export function BedOccupancy() {
  const occupancyPercent = Math.round((bedOccupancy.occupied / bedOccupancy.total) * 100)

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Bed Occupancy</CardTitle>
          <span className="text-2xl font-bold text-primary">{occupancyPercent}%</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Progress value={occupancyPercent} className="h-3" />
          <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
            <span>{bedOccupancy.occupied} occupied</span>
            <span>{bedOccupancy.available} available</span>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          {bedOccupancy.wards.map((ward) => {
            const wardPercent = Math.round((ward.occupied / ward.total) * 100)
            return (
              <div key={ward.name} className="flex items-center gap-3">
                <span className="w-24 text-xs text-muted-foreground truncate">{ward.name}</span>
                <div className="flex-1">
                  <Progress value={wardPercent} className="h-1.5" />
                </div>
                <span className="w-16 text-right text-xs font-medium text-foreground">
                  {ward.occupied}/{ward.total}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
