import { useEffect, useState } from 'react'

// Versão demo sem dependências externas
const AuthWidget = () => {
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage (apenas demo)
    const savedUser = localStorage.getItem('demo_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = () => {
    // Demo login
    const demoUser = { name: 'Usuário Demo' }
    localStorage.setItem('demo_user', JSON.stringify(demoUser))
    setUser(demoUser)
    alert('Login demo realizado!')
  }

  const handleLogout = () => {
    localStorage.removeItem('demo_user')
    setUser(null)
    alert('Logout realizado!')
  }

  return (
    <div className="auth-widget">
      {user ? (
        <div>
          <p>Bem-vindo, {user.name}!</p>
          <button onClick={handleLogout} className="btn btn-logout">
            Sair
          </button>
        </div>
      ) : (
        <button onClick={handleLogin} className="btn btn-login">
          Entrar
        </button>
      )}
    </div>
  )
}

export default AuthWidget