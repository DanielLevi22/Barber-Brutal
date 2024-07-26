"use client"
import { AuthProvider } from "@/data/contexts/auth-context";
import { ScheduleProvider } from "@/data/contexts/schedule-context";

export function Provider({children}: {children: React.ReactNode}) {

  return (
    <AuthProvider>
      <ScheduleProvider>
      {children}
      </ScheduleProvider>
    </AuthProvider>
  )
}