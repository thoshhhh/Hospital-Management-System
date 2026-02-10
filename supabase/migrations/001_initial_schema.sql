-- ============================================================
-- Hospital Management System - Initial Schema + RLS
-- Run this in Supabase SQL Editor or via Supabase CLI
-- ============================================================

-- 1. profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'doctor', 'patient')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. doctors
CREATE TABLE IF NOT EXISTS public.doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  specialization TEXT,
  experience_years INTEGER,
  availability_status BOOLEAN DEFAULT true,
  working_hours TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. patients
CREATE TABLE IF NOT EXISTS public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  age INTEGER,
  gender TEXT,
  medical_history TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. appointments
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  appointment_date TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Completed', 'Cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_doctors_profile_id ON public.doctors(profile_id);
CREATE INDEX IF NOT EXISTS idx_patients_profile_id ON public.patients(profile_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON public.appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON public.appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- ============== HELPER: get current user role ==============
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid()
$$;

-- ============== PROFILES POLICIES ==============
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (id = auth.uid());

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (id = auth.uid());

-- Users can insert their own profile (for signup flow: doctor/patient create profile after auth signup)
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (id = auth.uid());

-- Admin can view all profiles
CREATE POLICY "Admin can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.get_my_role() = 'admin');

-- ============== DOCTORS POLICIES ==============
-- Doctor can view/update their own record
CREATE POLICY "Doctor can view own record"
  ON public.doctors FOR SELECT
  USING (profile_id = auth.uid());

CREATE POLICY "Doctor can update own record"
  ON public.doctors FOR UPDATE
  USING (profile_id = auth.uid());

-- Patients can view doctors (read-only)
CREATE POLICY "Patients can view doctors"
  ON public.doctors FOR SELECT
  USING (public.get_my_role() = 'patient');

-- Admin can do everything on doctors
CREATE POLICY "Admin can manage doctors"
  ON public.doctors FOR ALL
  USING (public.get_my_role() = 'admin')
  WITH CHECK (public.get_my_role() = 'admin');

-- Allow doctors to insert their own row (when they register, profile is created first; then we need to allow doctor row insert)
-- Only allow insert if the profile_id is the current user and their role is doctor
CREATE POLICY "Doctor can insert own record"
  ON public.doctors FOR INSERT
  WITH CHECK (
    profile_id = auth.uid()
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'doctor')
  );

-- ============== PATIENTS POLICIES ==============
-- Patient can view/update own record
CREATE POLICY "Patient can view own record"
  ON public.patients FOR SELECT
  USING (profile_id = auth.uid());

CREATE POLICY "Patient can update own record"
  ON public.patients FOR UPDATE
  USING (profile_id = auth.uid());

-- Patient can insert own record (signup)
CREATE POLICY "Patient can insert own record"
  ON public.patients FOR INSERT
  WITH CHECK (
    profile_id = auth.uid()
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'patient')
  );

-- Doctor can view patients who have appointments with them
CREATE POLICY "Doctor can view assigned patients"
  ON public.patients FOR SELECT
  USING (
    public.get_my_role() = 'doctor'
    AND EXISTS (
      SELECT 1 FROM public.appointments a
      WHERE a.patient_id = patients.profile_id
        AND a.doctor_id = auth.uid()
    )
  );

-- Admin can view all patients
CREATE POLICY "Admin can view all patients"
  ON public.patients FOR SELECT
  USING (public.get_my_role() = 'admin');

CREATE POLICY "Admin can manage patients"
  ON public.patients FOR ALL
  USING (public.get_my_role() = 'admin')
  WITH CHECK (public.get_my_role() = 'admin');

-- ============== APPOINTMENTS POLICIES ==============
-- Patient can create appointment for themselves
CREATE POLICY "Patient can create own appointment"
  ON public.appointments FOR INSERT
  WITH CHECK (
    patient_id = auth.uid()
    AND public.get_my_role() = 'patient'
  );

-- Patient can view their own appointments
CREATE POLICY "Patient can view own appointments"
  ON public.appointments FOR SELECT
  USING (patient_id = auth.uid());

-- Doctor can view/update appointments assigned to them
CREATE POLICY "Doctor can view own appointments"
  ON public.appointments FOR SELECT
  USING (doctor_id = auth.uid());

CREATE POLICY "Doctor can update own appointments"
  ON public.appointments FOR UPDATE
  USING (doctor_id = auth.uid());

-- Admin can view all appointments
CREATE POLICY "Admin can view all appointments"
  ON public.appointments FOR SELECT
  USING (public.get_my_role() = 'admin');

-- Admin can manage all appointments
CREATE POLICY "Admin can manage appointments"
  ON public.appointments FOR ALL
  USING (public.get_my_role() = 'admin')
  WITH CHECK (public.get_my_role() = 'admin');

-- ============================================================
-- Optional: Trigger to auto-create profile on auth signup
-- (Alternative: create profile in frontend right after signUp)
-- ============================================================
-- This requires enabling the auth.users trigger in Supabase.
-- Alternatively use Edge Function "handle_new_user" to insert into profiles.
-- For now, the frontend will create the profile after signup.

COMMENT ON TABLE public.profiles IS 'Extends auth.users; role is one of admin, doctor, patient.';
COMMENT ON TABLE public.doctors IS 'Doctor details linked to profiles.';
COMMENT ON TABLE public.patients IS 'Patient details linked to profiles.';
COMMENT ON TABLE public.appointments IS 'Appointments link patient_id and doctor_id (both profile IDs).';
