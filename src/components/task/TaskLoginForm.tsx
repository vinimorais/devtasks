'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Input } from '@/design-system/Input/Input'
import { Button } from '@/design-system/Button/Button'
import { useRouter } from 'next/navigation' 

export function TaskLoginForm() {
  const { login, register } = useAuth()
  const router = useRouter() 
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isRegisterMode, setIsRegisterMode] = useState(false)

  const handleLogin = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    const successLogin = login(username, password)
    
    if (successLogin) {
      router.push('/dashboard') 
    } else {
      setError('Usuário ou senha inválidos')
    }
  }

  const handleRegister = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    const res = register(username, password)
    if (!res.success) {
      setError(res.message ?? 'Erro desconhecido')
    } else {
      setSuccess(res.message ?? 'Usuário criado com sucesso!')
      setIsRegisterMode(false) 
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div className="p-6 border rounded-lg max-w-md mx-auto bg-white shadow-sm">
      <div className="flex justify-between mb-4 gap-2">
        <Button
          type="button"
          className={`flex-1 px-4 py-2 rounded ${!isRegisterMode ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => { setIsRegisterMode(false); setError(null); setSuccess(null) }}
        >
          Login
        </Button>
        <Button
          type="button"
          className={`flex-1 px-4 py-2 rounded ${isRegisterMode ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => { setIsRegisterMode(true); setError(null); setSuccess(null) }}
        >
          Criar Usuário
        </Button>
      </div>

      <form onSubmit={isRegisterMode ? handleRegister : handleLogin} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
        {success && <p className="text-green-500 text-sm font-medium">{success}</p>}

        <Button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors">
          {isRegisterMode ? 'Cadastrar agora' : 'Entrar no DevTasks'}
        </Button>
      </form>
    </div>
  )
}