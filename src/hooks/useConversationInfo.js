import { useQuery } from '@tanstack/react-query'
import { getConversationInfo } from '@/services/conversation.service'

/**
 * Custom hook to fetch conversation info including participant details
 * @param {string} conversationId - Conversation ID
 * @param {Object} options - Additional React Query options
 * @returns {Object} React Query result with conversation info
 */
export const useConversationInfo = (conversationId, options = {}) => {
  return useQuery({
    queryKey: ['conversationInfo', conversationId],
    queryFn: () => getConversationInfo(conversationId),
    enabled: !!conversationId,
    staleTime: 1000 * 60 * 5,
    ...options
  })
}
