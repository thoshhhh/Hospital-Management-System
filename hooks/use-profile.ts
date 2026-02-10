"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Profile } from "@/lib/database.types"
import type { User } from "@supabase/supabase-js"

export function useProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const client = createClient()
    client.auth.getUser().then(({ data: { user: u } }) => {
      setUser(u ?? null)
      if (!u) {
        setProfile(null)
        setLoading(false)
        return
      }
      client
        .from("profiles")
        .select("*")
        .eq("id", u.id)
        .single()
        .then(({ data, error }) => {
          setProfile(error ? null : data)
          setLoading(false)
        })
    })

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (!session?.user) {
        setProfile(null)
        return
      }
      client
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single()
        .then(({ data, error }) => setProfile(error ? null : data))
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, profile, role: profile?.role ?? null, loading }
}
