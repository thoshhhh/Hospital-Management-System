"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Shield, Bell, Moon } from "lucide-react"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your account and system preferences.</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="roles" className="gap-2">
              <Shield className="h-4 w-4" />
              Roles
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Moon className="h-4 w-4" />
              Appearance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Profile Settings</CardTitle>
                <CardDescription>Update your personal information and credentials.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 max-w-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                      AD
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Change Avatar</Button>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input id="fullname" defaultValue="Admin User" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="admin@medboard.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 555-0100" />
                  </div>
                  <Separator />
                  <div className="grid gap-2">
                    <Label htmlFor="currentpass">Current Password</Label>
                    <Input id="currentpass" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="newpass">New Password</Label>
                    <Input id="newpass" type="password" />
                  </div>
                  <Button className="w-fit">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="mt-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Role Management</CardTitle>
                <CardDescription>Configure user roles and permissions.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 max-w-lg">
                  {[
                    { role: "Administrator", description: "Full access to all modules", count: 2 },
                    { role: "Doctor", description: "Access to patients, appointments, and lab", count: 6 },
                    { role: "Receptionist", description: "Access to patients and appointments", count: 4 },
                    { role: "Pharmacist", description: "Access to pharmacy module only", count: 3 },
                    { role: "Lab Technician", description: "Access to laboratory module only", count: 2 },
                  ].map((item) => (
                    <div key={item.role} className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold">{item.role}</p>
                          <Badge variant="secondary" className="text-[10px]">{item.count} users</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Notification Preferences</CardTitle>
                <CardDescription>Configure how you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6 max-w-lg">
                  {[
                    { label: "New Patient Admissions", description: "Get notified when a new patient is admitted" },
                    { label: "Appointment Reminders", description: "Receive reminders for upcoming appointments" },
                    { label: "Low Stock Alerts", description: "Alert when medicine stock falls below threshold" },
                    { label: "Payment Notifications", description: "Notify about payment status changes" },
                    { label: "Lab Results Ready", description: "Notify when lab results are available" },
                    { label: "Email Notifications", description: "Receive notifications via email" },
                  ].map((item, idx) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <Switch defaultChecked={idx < 4} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="mt-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the dashboard.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6 max-w-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Dark Mode</p>
                      <p className="text-xs text-muted-foreground">Switch between light and dark themes</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="grid gap-2">
                    <Label>Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Timezone</Label>
                    <Select defaultValue="est">
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="est">Eastern (EST)</SelectItem>
                        <SelectItem value="cst">Central (CST)</SelectItem>
                        <SelectItem value="mst">Mountain (MST)</SelectItem>
                        <SelectItem value="pst">Pacific (PST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
