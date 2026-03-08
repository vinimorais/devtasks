'use client'

import { TaskForm } from '@/components/task/TaskForm'
import { TaskList } from '@/components/task/TaskList'
import { TaskLoginForm } from '@/components/task/TaskLoginForm'
import { TaskChart } from '@/components/task/TaskChart'
import { useAuth } from '@/context/AuthContext'
import { AppWrapper } from './AppWrapper'

export default function HomePagePageWrapper() {
  return (
    <AppWrapper>
      <HomePageContent />
    </AppWrapper>
  )
}

function HomePageContent() {
  const { isAuthenticated, currentUser } = useAuth() 

  if (!isAuthenticated) {
    return (
      <main className="max-w-md mx-auto p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center mb-4">Bem-vindo ao DevTasks</h1>
        <TaskLoginForm />
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        DevTasks - {currentUser?.username}
      </h1>

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