'use client'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/design-system/Button/Button'

interface HeaderProps {
  className?: string
  children?: React.ReactNode 
}
export function Header({ className, children }: HeaderProps) {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <header className={`relative w-full flex items-center justify-center border-b pb-6 mb-8 ${className}`}>
      <div className="text-center">
        {children}
      </div>
      
      <div className="absolute right-0">
        <Button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-all no-underline border-none shadow-md hover:shadow-lg"
        >
          Sair
        </Button>
      </div>
    </header>
  )
}