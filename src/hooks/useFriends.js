import { useQuery } from '@tanstack/react-query'
import { getFriends } from '@/services/user.service'

/**
 * Custom hook to fetch friends list
 * @returns {object} React Query result
 */
export const useFriends = () => {
  return useQuery({
    queryKey: ['friends'],
    queryFn: getFriends,
    staleTime: 1000 * 60 * 5, // 5 minutes
    select: (data) => data || []
  })
}
