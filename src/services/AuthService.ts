'use client'

import { User } from '@/domain/entities/User'
import { AuthResult } from '@/domain/interfaces/AuthResult'

const USERS_KEY = 'devtasks:users'
const SESSION_KEY = 'devtasks:session'

export class AuthService {
  private users: User[] = []

  constructor() {
  }

  private loadUsers() {
    const storedUsers = localStorage.getItem(USERS_KEY)
    this.users = storedUsers ? JSON.parse(storedUsers) : []
  }

  login(username: string, password: string): boolean {
    this.loadUsers()
    const user = this.users.find(u => u.username === username && u.password === password)
    if (!user) return false

    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    return true
  }

  register(username: string, password: string): AuthResult {
    this.loadUsers()
    if (!username || !password) return { success: false, message: 'Preencha todos os campos' }
    if (this.users.some(u => u.username === username)) {
      return { success: false, message: 'Usuário já existe' }
    }

    const newUser: User = { username, password }
    this.users.push(newUser)
    localStorage.setItem(USERS_KEY, JSON.stringify(this.users))

    return { success: true, message: 'Usuário criado com sucesso!' }
  }

  logout() {
    localStorage.removeItem(SESSION_KEY)
  }

  getCurrentUser(): User | null {
    const stored = localStorage.getItem(SESSION_KEY)
    return stored ? JSON.parse(stored) : null
  }
}