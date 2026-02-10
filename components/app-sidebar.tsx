"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarDays,
  BarChart3,
  Settings,
  Heart,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useProfile } from "@/hooks/use-profile"
import type { Role } from "@/lib/database.types"

const mainNav = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Patients", url: "/patients", icon: Users, roles: ["admin", "doctor"] as Role[] },
  { title: "Doctors", url: "/doctors", icon: Stethoscope, roles: ["admin", "doctor", "patient"] as Role[] },
  { title: "Appointments", url: "/appointments", icon: CalendarDays, roles: ["admin", "doctor", "patient"] as Role[] },
]

const systemNav = [
  { title: "Reports", url: "/reports", icon: BarChart3, roles: ["admin"] as Role[] },
  { title: "Settings", url: "/settings", icon: Settings, roles: ["admin", "doctor", "patient"] as Role[] },
]

function filterNav(items: typeof mainNav, role: Role | null) {
  if (!role) return []
  return items.filter((item) => !item.roles || item.roles.includes(role))
}

export function AppSidebar() {
  const pathname = usePathname()
  const { profile, role, loading } = useProfile()

  const mainItems = filterNav(mainNav, role ?? null)
  const systemItems = filterNav(systemNav, role ?? null)

  const displayName = profile?.full_name || "User"
  const roleLabel = role === "admin" ? "Administrator" : role === "doctor" ? "Doctor" : role === "patient" ? "Patient" : ""

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Heart className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-bold text-foreground tracking-tight">MedBoard</span>
            <span className="text-[10px] text-muted-foreground leading-none">Hospital Management</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {systemItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>System</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {systemItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2 group-data-[collapsible=icon]:justify-center">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {loading ? "…" : (displayName.slice(0, 2).toUpperCase() || "U")}
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium text-foreground truncate">{displayName}</span>
            <span className="text-xs text-muted-foreground">{roleLabel}</span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
