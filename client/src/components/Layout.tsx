import { ReactNode } from 'react'
import { useMeContext } from '../contexts/Me.context'
import { Navigate } from 'react-router-dom'

type Props = {
  children: ReactNode
  isAuthenticated?: boolean
}

export function Layout({ children, isAuthenticated = false }: Props) {
  const { data: user, isLoading } = useMeContext()

  return (
    <main className="dark text-foreground bg-background min-h-screen">
      {isLoading ? (
        <div className="max-w-[80%] m-auto text-center">... Loading!!</div>
      ) : !user && isAuthenticated ? (
        <Navigate to="/signup" />
      ) : (
        <div className="max-w-[80%] m-auto">{children}</div>
      )}
    </main>
  )
}
