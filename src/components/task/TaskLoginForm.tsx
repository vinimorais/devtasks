'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Input } from '@/design-system/Input/Input'
import { Button } from '@/design-system/Button/Button'

export function TaskLoginForm() {
  const { login, register } = useAuth()
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
    if (!successLogin) setError('Usuário ou senha inválidos')
  }

  const handleRegister = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    const res = register(username, password)
    if (!res.success) setError(res.message ?? 'Erro desconhecido')
    else setSuccess(res.message ?? 'Usuário criado com sucesso!')
    setUsername('')
    setPassword('')
  }

  return (
    <div className="p-6 border rounded-lg max-w-md mx-auto">
      <div className="flex justify-between mb-4">
        <Button
          type="button"
          className={`px-4 py-2 ${!isRegisterMode ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => { setIsRegisterMode(false); setError(null); setSuccess(null) }}
        >
          Login
        </Button>
        <Button
          type="button"
          className={`px-4 py-2 ${isRegisterMode ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
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
          className="border p-2 rounded"
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <Button type="submit" className="bg-blue-600 text-white p-2 rounded">
          {isRegisterMode ? 'Criar Usuário' : 'Entrar'}
        </Button>
      </form>
    </div>
  )
}