'use client'

import { TaskForm } from '@/components/task/TaskForm'
import { TaskList } from '@/components/task/TaskList'
import { AppWrapper } from './AppWrapper'

export default function HomePage() {
  return (
    <AppWrapper>
      
      <main className="max-w-3xl mx-auto p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center">DevTasks</h1>
        

        <section>
          <h2 className="text-xl font-semibold mb-2">Nova Task</h2>
          <TaskForm />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Minhas Tasks</h2>
          <TaskList />
        </section>
      </main>
    </AppWrapper>
  )
}