import { useEffect, useState } from 'react'

const AuthWidget = () => {
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = () => {
    const demoUser = { name: 'Usuário Demo' }
    localStorage.setItem('user', JSON.stringify(demoUser))
    setUser(demoUser)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <div className="auth-widget">
      {user ? (
        <div>
          <p>Bem-vindo, {user.name}!</p>
          <button onClick={handleLogout}>Sair</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Entrar</button>
      )}
    </div>
  )
}

export default AuthWidget