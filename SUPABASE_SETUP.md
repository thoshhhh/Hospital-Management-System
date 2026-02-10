# Supabase Setup – Hospital Management System

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In **Settings → API** copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2. Environment variables

Create `.env.local` in the project root (see `.env.local.example`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 3. Run the database migrations

1. In the Supabase dashboard open **SQL Editor**.
2. Run **in this order**:
   - Copy and run the contents of `supabase/migrations/001_initial_schema.sql` (tables + RLS).
   - Copy and run the contents of `supabase/migrations/002_handle_new_user.sql` (trigger that creates profile + doctor/patient row on signup; this fixes the “new row violates row-level security” error).

## 4. Create admin accounts

Admins are **not** allowed to register via the app. Create them manually:

1. In Supabase go to **Authentication → Users** and **Add user** (or **Invite**).
2. Create two users, e.g.:
   - `admin1@hospital.com`
   - `admin2@hospital.com`
   Set a password for each (or use email confirmation if you prefer).

3. In **SQL Editor** run (replace the UUIDs with the real `id` values from **Authentication → Users**):

```sql
-- After creating the two users in Auth, insert their profiles (use actual UUIDs from Auth → Users):
INSERT INTO public.profiles (id, full_name, role)
VALUES
  ('uuid-of-admin1-from-auth-dashboard', 'Admin One', 'admin'),
  ('uuid-of-admin2-from-auth-dashboard', 'Admin Two', 'admin');
```

To get the UUIDs: **Authentication → Users** → click a user → copy **User UID**.

## 5. Optional: storage bucket (medical records)

If you want the optional `medical-records` bucket:

1. **Storage** → **New bucket** → name: `medical-records`, make it **private**.
2. Add RLS policies so that:
   - Patients can upload to their own folder.
   - Doctors can read files for patients they have appointments with.
   - Admins can read/write as needed.

## 5b. Sign up flow (Doctor / Patient)

For **Sign up** to work without an Edge Function:

- In Supabase go to **Authentication → Providers → Email**.
- Turn **off** “Confirm email” if you want users to be logged in immediately after sign up.

If you leave “Confirm email” **on**, new users must confirm their email before they can sign in. To still create `profiles` (and `doctors`/`patients`) in that case, use a Supabase **Edge Function** or **Database Webhook** on `auth.users` insert to create the profile from the new user’s `id` and `raw_user_meta_data` (e.g. `role`, `full_name`).

## 6. Run the app

```bash
pnpm dev
```

- Open **http://localhost:3000** (you will be redirected to `/login` if not signed in).
- Sign in with an admin user, or sign up as **Doctor** or **Patient** and use the app.

## Roles and access

| Role   | Can do |
|--------|--------|
| Admin  | Full access: all profiles, doctors, patients, appointments; Reports & Settings. |
| Doctor | Own profile/doctor record; view doctors and assigned patients; view/update own appointments; Settings. |
| Patient| Own profile/patient record; view doctors; view own appointments; book appointments; Settings. |

RLS enforces all of this in the database.
