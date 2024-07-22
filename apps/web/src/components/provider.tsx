"use client"
import { AuthProvider } from "@/data/contexts/auth-context";

export function Provider({children}: {children: React.ReactNode}) {

  return <AuthProvider>{children}</AuthProvider>
}