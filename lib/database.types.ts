export type Role = "admin" | "doctor" | "patient"

export type Profile = {
  id: string
  full_name: string | null
  role: Role
  created_at: string
}

export type Doctor = {
  id: string
  profile_id: string
  specialization: string | null
  experience_years: number | null
  availability_status: boolean
  working_hours: string | null
  created_at?: string
}

export type Patient = {
  id: string
  profile_id: string
  age: number | null
  gender: string | null
  medical_history: string[]
  created_at?: string
}

export type AppointmentStatus = "Scheduled" | "Completed" | "Cancelled"

export type Appointment = {
  id: string
  patient_id: string
  doctor_id: string
  appointment_date: string
  status: AppointmentStatus
  notes: string | null
  created_at: string
}

// Joined types for UI (with profile names)
export type DoctorWithProfile = Doctor & {
  profiles?: { full_name: string | null } | null
}

export type PatientWithProfile = Patient & {
  profiles?: { full_name: string | null } | null
}

export type AppointmentWithDetails = Appointment & {
  patient_profile?: { full_name: string | null } | null
  doctor_profile?: { full_name: string | null } | null
}
