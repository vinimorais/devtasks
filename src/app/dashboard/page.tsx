'use client'
import { TaskForm } from '@/components/task/TaskForm'
import { TaskList } from '@/components/task/TaskList'
import { TaskChart } from '@/components/task/TaskChart'
import { Header } from '@/components/layout/Header'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { isAuthenticated, currentUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null 

  return (
    <main className="max-w-3xl mx-auto p-6 flex flex-col gap-6">
      <Header>
      <h1 className="text-2xl font-bold text-gray-800">
        DevTasks - Usuário: <span className="text-blue-600">{currentUser?.username}</span>
      </h1>
    </Header>

      <section>
        <h2 className="text-xl font-semibold mb-2">Nova Task</h2>
        <TaskForm />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Minhas Tasks</h2>
        <TaskList />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Gráfico de Tasks</h2>
        <TaskChart />
      </section>
    </main>
  )
}