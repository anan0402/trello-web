import { useQuery } from '@tanstack/react-query'
import { getOrCreateConversation } from '@/services/conversation.service'

/**
 * Custom hook to get or create a conversation with a user
 * @param {string} userId - User ID to start conversation with
 * @param {Object} options - Additional React Query options
 * @returns {Object} React Query result with conversation data
 */
export const useConversation = (userId, options = {}) => {
  return useQuery({
    queryKey: ['conversation', userId],
    queryFn: async () => {
      const response = await getOrCreateConversation(userId)
      return response
    },
    enabled: !!userId, // Only fetch when userId exists
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options
  })
}
