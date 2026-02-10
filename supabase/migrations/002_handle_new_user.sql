-- ============================================================
-- Auto-create profile + doctor/patient row on signup
-- Fixes "new row violates row-level security" because the
-- insert runs as the database, not the client (no session yet).
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role TEXT;
  user_name TEXT;
BEGIN
  user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'patient');
  user_name := NEW.raw_user_meta_data->>'full_name';

  -- Only allow doctor or patient from signup; admins are created manually
  IF user_role NOT IN ('doctor', 'patient') THEN
    user_role := 'patient';
  END IF;

  INSERT INTO public.profiles (id, full_name, role)
  VALUES (NEW.id, user_name, user_role);

  IF user_role = 'doctor' THEN
    INSERT INTO public.doctors (profile_id, specialization, experience_years, availability_status, working_hours)
    VALUES (NEW.id, NULL, NULL, true, NULL);
  ELSIF user_role = 'patient' THEN
    INSERT INTO public.patients (profile_id, age, gender, medical_history)
    VALUES (NEW.id, NULL, NULL, '{}');
  END IF;

  RETURN NEW;
END;
$$;

-- Trigger on auth.users (runs after a new user is inserted)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
