import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import AuthWidget from '../components/AuthWidget'
import { useProgressStore } from '../store/progress'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Trilha do Engenheiro de Dados' },
      { name: 'description', content: 'Roteiro completo e gratuito para se tornar Engenheiro de Dados, do zero ao profissional.' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { completedStages } = useProgressStore()

  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body className="noise">
        <header className="p-4 bg-blue-600 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Trilha do Engenheiro de Dados</h1>
            <p>Progresso: {completedStages.length} etapas concluídas</p>
          </div>
          <AuthWidget />
        </header>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
