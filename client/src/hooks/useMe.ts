import { useQuery } from '@tanstack/react-query'
import { fetchMe } from '../api/queries/fetchMe'

export const useMe = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
  })
  return { data, isLoading, error }
}
