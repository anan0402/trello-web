import { useQuery } from '@tanstack/react-query'
import { getUserDetails } from '@/services/user.service'

/**
 * Custom hook to fetch user details
 * @param {string} userId - User ID
 * @returns {object} React Query result
 */
export const useUserDetails = (userId) => {
  console.log('useUserDetails userId', userId)
  return useQuery({
    queryKey: ['userDetails', userId],
    queryFn: () => getUserDetails(userId),
    enabled: !!userId
  })
}
