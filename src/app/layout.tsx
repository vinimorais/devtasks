import '@/styles/globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { TaskProvider } from '@/context/TaskContext' 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
     <body suppressHydrationWarning>
        <AuthProvider>
          <TaskProvider>
            {children}
          </TaskProvider>
        </AuthProvider>
      </body>
    </html>
  )
}