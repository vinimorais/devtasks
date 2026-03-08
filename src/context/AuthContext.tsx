'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useAuth as useAuthHook } from '@/hooks/useAuth'
import { User } from '@/domain/entities/User'
import { AuthResult } from '@/domain/interfaces/AuthResult'

interface AuthContextProps {
  currentUser: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  register: (username: string, password: string) => AuthResult
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthHook()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}