'use client'

import { useState, useEffect } from 'react'
import { User } from '@/domain/entities/User'
import { AuthResult } from '@/domain/interfaces/AuthResult'
import { AuthService } from '@/services/AuthService'

export function useAuth() {
  const service = new AuthService()
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    setCurrentUser(service.getCurrentUser())
  }, [])

  const login = (username: string, password: string): boolean => {
    const success = service.login(username, password)
    if (success) setCurrentUser(service.getCurrentUser())
    return success
  }

  const logout = () => {
    service.logout()
    setCurrentUser(null)
  }

  const register = (username: string, password: string): AuthResult => {
    return service.register(username, password)
  }

  return { currentUser, isAuthenticated: !!currentUser, login, logout, register }
}