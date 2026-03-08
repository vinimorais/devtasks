'use client'

import { FC, useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useTasksContext } from '@/context/TaskContext'
import { Status, Priority } from '@/domain/enums/TaskEnums'
import {
  priorityLabels,
  statusLabels,
  priorityLabel,
  statusLabel,
  statusColor,
  filterOptions,
} from '@/styles/task/TaskChart.styles'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const TaskChart: FC = () => {
  const { tasks } = useTasksContext()
  const [filter, setFilter] = useState<'all' | Status>('all')

  const data = useMemo(() => {
    const filteredTasks = filter === 'all' ? tasks : tasks.filter(t => t.status === filter)

    const datasets = statusLabels.map(status => {
      const dataPerPriority = priorityLabels.map(priority =>
        filteredTasks.filter(t => t.status === status && t.priority === priority).length
      )
      return {
        label: statusLabel(status),
        data: dataPerPriority,
        backgroundColor: statusColor(status),
      }
    })

    return { labels: priorityLabels.map(priorityLabel), datasets }
  }, [tasks, filter])

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Tasks por Prioridade e Status', font: { size: 18 } },
    },
    scales: { x: { stacked: false }, y: { beginAtZero: true } },
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex gap-2 mb-4">
        {filterOptions.map(opt => (
          <button
            key={opt}
            className={`px-3 py-1 rounded ${
              filter === opt ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setFilter(opt)}
          >
            {opt === 'all' ? 'Todos' : statusLabel(opt)}
          </button>
        ))}
      </div>

      <Bar data={data} options={options} />
    </div>
  )
}