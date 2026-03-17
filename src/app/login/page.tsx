'use client'
import { TaskLoginForm } from '@/components/task/TaskLoginForm'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  return (
    <main className="max-w-md mx-auto p-6 flex flex-col gap-6 mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Bem-vindo ao DevTasks</h1>
      <TaskLoginForm />
    </main>
  )
}