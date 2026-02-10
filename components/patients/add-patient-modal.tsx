"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AddPatientModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
          <DialogDescription>Enter the patient details below.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" placeholder="35" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <Select>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact">Contact Number</Label>
            <Input id="contact" placeholder="+1 555-0000" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="disease">Disease / Condition</Label>
            <Input id="disease" placeholder="Enter diagnosis" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="blood">Blood Group</Label>
              <Select>
                <SelectTrigger id="blood">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="o+">O+</SelectItem>
                  <SelectItem value="o-">O-</SelectItem>
                  <SelectItem value="a+">A+</SelectItem>
                  <SelectItem value="a-">A-</SelectItem>
                  <SelectItem value="b+">B+</SelectItem>
                  <SelectItem value="b-">B-</SelectItem>
                  <SelectItem value="ab+">AB+</SelectItem>
                  <SelectItem value="ab-">AB-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="doctor">Assigned Doctor</Label>
              <Select>
                <SelectTrigger id="doctor">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="d1">Dr. Sarah Chen</SelectItem>
                  <SelectItem value="d2">Dr. Michael Brown</SelectItem>
                  <SelectItem value="d3">Dr. James Lee</SelectItem>
                  <SelectItem value="d4">Dr. Aisha Patel</SelectItem>
                  <SelectItem value="d5">Dr. Robert Kim</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="123 Main Street, City" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Add Patient</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
