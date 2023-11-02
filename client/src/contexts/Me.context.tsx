import { ReactNode, createContext, useContext } from 'react'
import { useMe } from '../hooks/useMe'
import { User } from '../api/queries/fetchMe'

type MeContextType = {
  data: User | undefined
  isLoading: boolean
  error: Error | null
}
const MeContext = createContext<MeContextType>({
  data: undefined,
  isLoading: true,
  error: null,
})

type Props = {
  children: ReactNode
}

export const MeContextProvider = ({ children }: Props) => {
  const { data, isLoading, error } = useMe()

  return (
    <MeContext.Provider value={{ data, isLoading, error }}>
      {children}
    </MeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMeContext = () => {
  const { data, isLoading, error } = useContext(MeContext)

  return { data, isLoading, error }
}
